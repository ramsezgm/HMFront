export interface Customer {
    customer_id: number;
    age: number;
    frequency_of_purchases: number;
    promo_code_used: number;
    subscription_status: number;
    gender?: string;  // Podría ser null o string según la respuesta
}