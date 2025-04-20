// utils/trackClick.js
import { supabase } from "../lib/supabase";

export async function trackWebsiteClick(productId) {
  if (!productId) {
    console.error("No product ID provided for click tracking");
    return { success: false, error: "No product ID provided" };
  }

  console.log("Tracking click for product ID:", productId);

  try {
    // First get the current click count
    const { data, error: fetchError } = await supabase
      .from("products")
      .select("clicks")
      .eq("id", productId)
      .single();

    if (fetchError) {
      console.error("Error fetching current click count:", fetchError);
      throw fetchError;
    }

    console.log("Current click count:", data?.clicks);

    // Calculate new click count
    const currentClicks = data?.clicks || 0;
    const newClickCount = currentClicks + 1;

    console.log("New click count will be:", newClickCount);

    // Update with new click count
    const { error: updateError } = await supabase
      .from("products")
      .update({ clicks: newClickCount })
      .eq("id", productId);

    if (updateError) {
      console.error("Error updating click count:", updateError);
      throw updateError;
    }

    console.log("Click count updated successfully");

    return { success: true, newClickCount };
  } catch (error) {
    console.error("Error tracking click:", error);
    return { success: false, error: error.message };
  }
}
