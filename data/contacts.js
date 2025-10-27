import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const contacts = [
  {
    name: 'TikTok',
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@mikawig',
    display: 'Mai Tóc Giả'
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    url: 'https://web.facebook.com/share/1FScrLtVv6/?mibextid=wwXIfr&_rdc=1&_rdr',
    display: 'Mai Tóc Giả'
  },
  {
    name: 'Email',
    icon: MdEmail,
    url: 'mailto:mikawig.contact@gmail.com',
    display: 'mikawig.contact@gmail.com'
  },
  {
    name: 'Zalo',
    icon: SiZalo,
    url: 'https://zalo.me/0787105263',
    display: '0787 105 263'
  },
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    url: 'https://wa.me/84787105263',
    display: '+84 787 105 263'
  }
]

export default contacts;