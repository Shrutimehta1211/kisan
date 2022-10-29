import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from 'next/router'
import ContentLoader from "../Components/ContentLoader";

const privateRoute = Component => {
    const Auth = (props) => {
        const { user } = useContext(AppContext);
        const router = useRouter();
        if(!user?._id) {
            router.push('/register')
            return <ContentLoader />;
        }
        return (
            <Component {...props} />
        );
    };
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }
    return Auth;
};

export default privateRoute;