import ListHeaderAvatar from "@design/List/ListHeaderAvatar";
import { useAuthContext } from "../Auth/AuthProvider";
import TextAvatar from "@design/Avatar/TextAvatar";

type Props = {
  onPress: () => void;
};

const UserHeader = ({ onPress }: Props) => {
  const { user } = useAuthContext();
  if (!user) {
    return null;
  }
  return (
    <ListHeaderAvatar
      title={`${user.first_name} ${user.last_name}`}
      description={user.email}
      avatar={<TextAvatar>{user.first_name[0] + user?.last_name[0]}</TextAvatar>}
      onPress={onPress}
    />
  );
};

export default UserHeader;
