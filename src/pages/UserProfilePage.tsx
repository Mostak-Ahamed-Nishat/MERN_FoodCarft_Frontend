import { useGetUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

function UserProfilePage() {
  const { currentUser, isLoading: loadingCurrentUser } = useGetUser();
  const { updateUser, isLoading } = useUpdateMyUser();

  if (loadingCurrentUser) {
    return <span>Loading profile data..</span>;
  }

  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
}

export default UserProfilePage;
