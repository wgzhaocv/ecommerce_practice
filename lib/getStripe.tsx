import  {loadStripe} from "@stripe/stripe-js";

let stripePromise;

const getStripe=()=>{
    if (!stripePromise){
        stripePromise=loadStripe("pk_test_51L4igYIC0VhkHFbjKwpPiDVPGMCJ0HBdyiwqww9Kfpa23zTqlhk1ckqgtTsHpRAGnk3IxEeUlDWDkptEp6ZZ1sKf00nkYiHk5L")
    }
    return stripePromise;
}
export  default getStripe;
