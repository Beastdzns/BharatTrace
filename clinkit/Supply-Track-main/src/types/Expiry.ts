export interface Inputs {
    shelfLifeType: 'FSL' | 'DSL';
    lefoFraction: number;
    profitMargin: number;
    weeklyDemand: number;
    originalPrice: number;
    currentInventory: number;
    remainingDays?: number;
    totalShelfLife?: number;
    currentMicro?: number;
  }
  
  export interface Result {
    recommendedDiscount?: number;
    discountedPrice?: number;
    finalProfitMargin?: number;
  }