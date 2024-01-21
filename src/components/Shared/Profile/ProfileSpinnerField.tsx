import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "@core/modules/profiles/api";
import AppSpinnerField, {
  AppSpinnerFieldProps,
} from "../Formik/AppSpinnerField";

const ProfileSpinnerField = (props: Omit<AppSpinnerFieldProps, "items">) => {
  const { data } = useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
  });

  if (!data) {
    return null;
  }

  return (
    <AppSpinnerField
      items={data.map((item) => ({ value: item.id, label: item.username }))}
      {...props}
    />
  );
};

export default ProfileSpinnerField;
