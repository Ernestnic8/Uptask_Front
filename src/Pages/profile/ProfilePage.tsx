import ProfileForm from "@components/profile/ProfileForm"
import Spinner from "@components/Spinner/Spinner"
import { useAuth } from "@hooks/useAuth"


const ProfilePage = () => {

    const {data, isLoading } = useAuth()
    if (isLoading) return <Spinner />

    if(data) return <ProfileForm data={data}/>
  
}

export default ProfilePage
