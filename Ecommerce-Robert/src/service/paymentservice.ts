
import { Istripeobject } from "../models/Istripeobject"
import { getdata, postdata } from "./basicservice"

const STRIPE_URL = "http://localhost:3000/stripe"



export const GetPaymentFromStripe = async (Stripeinfo:Istripeobject) =>{
 const Response = await postdata<Istripeobject>(`${STRIPE_URL}/create-checkout-session`,Stripeinfo)
 return Response
}
export const GetPaymentIdFromSessionId = async<T> (sessionId:string) =>{
 const Response = await getdata<T>(`${STRIPE_URL}/session/${sessionId}`)
 return Response 
}