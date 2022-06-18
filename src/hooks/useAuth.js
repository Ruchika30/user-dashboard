
import { Keys } from '../network/key'

const useAuth = () => {

    const logged = Boolean(localStorage.getItem(Keys.authToken))
    return {
        isLoggedIn: logged
    }
}
export default useAuth