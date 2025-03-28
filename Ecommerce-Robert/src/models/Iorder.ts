export interface IOrder {
  id: number; 
  customer_id: number;
  total_price?: number; 
  payment_status: string;
  payment_id: string | null;
  order_status: string;
  created_at?: string; 
  order_items: IOrderitem[];
}

  
  export interface IOrderitem {
    id: number; 
    product_id: number;
    product_name: string; 
    quantity: number; 
    unit_price: number; 

  }

  export interface IupdateOrderQuantity {
    quantity: number
  }

  export interface IOrderWithCustomer extends IOrder {
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    customer_phone: string;
    customer_street_address: string;
    customer_postal_code: string;
    customer_city: string;
    customer_country: string;
    customers_created_at?: string;
  }
  