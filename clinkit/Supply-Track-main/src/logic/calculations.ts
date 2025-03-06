// calculations.ts
import { Inputs, Result } from '../types/Expiry';

export function calculateDiscount(inputs: Inputs): Result {
  // Constants from the research
  const FSL_TOTAL_SHELF_LIFE = 8; // Default FSL shelf life (days)
  const DSL_DISCOUNT_THRESHOLD = 4.7; // η_discount (log cfu/g)
  const DSL_WASTE_THRESHOLD = 5.3; // η_waste (log cfu/g)

  const { 
    shelfLifeType, 
    lefoFraction, 
    profitMargin, 
    weeklyDemand, 
    originalPrice, 
    currentInventory,
    remainingDays,
    totalShelfLife,
    currentMicro
  } = inputs;

  // Calculate cost price
  const profitMarginDecimal = profitMargin / 100;
  const costPrice = originalPrice * (1 - profitMarginDecimal);
  
  let discount = 0;

  if (shelfLifeType === "FSL") {
    const remainingDaysValue = remainingDays || 0;
    const totalShelfLifeValue = totalShelfLife || FSL_TOTAL_SHELF_LIFE;
    
    // Base discount based on remaining days
    if (remainingDaysValue <= 0) {
      discount = 1.0; // 100% discount if expired
    } else if (remainingDaysValue === 1) {
      discount = 0.5; // 50% discount on last day
    } else if (remainingDaysValue === 2) {
      discount = 0.3; // 30% discount day before expiration
    } else {
      discount = 0.1; // 10% discount for older items
    }
    
    // Adjust based on LEFO fraction
    discount *= (1 + lefoFraction);
    
  } else if (shelfLifeType === "DSL" && currentMicro !== undefined) {
    // Calculate discount based on quality
    if (currentMicro >= DSL_WASTE_THRESHOLD) {
      discount = 1.0; // Must discard
    } else if (currentMicro >= DSL_DISCOUNT_THRESHOLD) {
      // Linear discount between threshold and waste limit
      const microRange = DSL_WASTE_THRESHOLD - DSL_DISCOUNT_THRESHOLD;
      discount = ((currentMicro - DSL_DISCOUNT_THRESHOLD) / microRange) * 0.7;
    } else {
      discount = 0.0;
    }
    
    // Adjust based on inventory and demand
    const stockRatio = currentInventory / (weeklyDemand / 7); // Daily demand
    if (stockRatio > 2) {
      discount += 0.2;
    } else if (stockRatio > 1) {
      discount += 0.1;
    }
  }
  
  // Ensure discount is between 0-100% and capped at 80%
  discount = Math.min(Math.max(discount, 0.0), 0.8);
  let discountedPrice = originalPrice * (1 - discount);
  
  // Ensure not selling below cost
  if (discountedPrice < costPrice) {
    discount = (originalPrice - costPrice) / originalPrice;
    discountedPrice = costPrice;
  }
  
  // Calculate final profit margin
  const finalProfitMargin = ((discountedPrice - costPrice) / discountedPrice) * 100;
  
  return {
    recommendedDiscount: discount * 100,
    discountedPrice,
    finalProfitMargin
  };
}