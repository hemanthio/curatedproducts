import { NextResponse } from "next/server";
// import { supabase } from '/lib/supabase';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const url = formData.get("url");
    const tags = JSON.parse(formData.get("tags"));
    const image = formData.get("image");

    if (!name || !description || !url || !tags || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image first
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${image.name}`;
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filename, buffer, {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get the public URL before database insertion
    const {
      data: { publicUrl },
    } = supabase.storage.from("uploads").getPublicUrl(filename);

    // Ensure imagePath is set before database insertion
    if (!publicUrl) {
      throw new Error("Failed to get public URL for uploaded image");
    }

    const { data: productData, error: dbError } = await supabase
      .from("products")
      .insert({
        name,
        description,
        url,
        tags,
        image: publicUrl,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database insertion failed: ${dbError.message}`);
    }

    return NextResponse.json(
      {
        success: true,
        product: productData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
