import NavBar from "@/components/shares/Header";
import SideNavBar from "@/components/shares/SideBar";
import { getAllWallets } from '/services/wallet';
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [wallets, setListWallets] = useState([]);
    useEffect(() => {
        getListWallets();
      }, []);
    
    const getListWallets = async (id) => {
        setLoading(true);
        try {
          const { data } = await getAllWallets();
          if (data) {
            setListWallets(data.filter((file) => file?.status !== 'DELETED'));
          }
        } catch (error) {
            setListWallets([]);
        } finally {
          setLoading(false);
        }
      };

    return (
        <div>
            <NavBar/>
            <SideNavBar/>
        </div>

    )
}
