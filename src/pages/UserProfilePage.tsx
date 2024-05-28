import { useGetUser, useUpdateMyUser } from "@/api/MyUserApi";
import Loading from "@/components/Loading";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

function UserProfilePage() {
  const { currentUser, isLoading: loadingCurrentUser } = useGetUser();
  const { updateUser, isLoading } = useUpdateMyUser();

  if (loadingCurrentUser) {
    return <Loading/>
  }

  if (!currentUser) {
    return <span>Unable to load user profile data</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isLoading}
      title="User Profile"
      buttonText="Submit"
    />
  );
}

export default UserProfilePage;
