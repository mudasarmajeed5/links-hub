import {
  ArrowRight,
  Send,
  ShoppingCart,
  Download,
  LogIn,
  PhoneCall,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const icons = {
  arrowRight: ArrowRight,
  send: Send,
  shoppingCart: ShoppingCart,
  download: Download,
  logIn: LogIn,
  phoneCall: PhoneCall,
  mail: Mail,
  whatsapp: FaWhatsapp,
};

export type IconKey = keyof typeof icons;
