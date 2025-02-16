import useLocalStorage from "../hooks/useLocalStorage";

const CheckPermission = ({
  children,
  role,
}: {
  children: React.ReactElement;
  role: string;
}) => {
  const [getStoredValue] = useLocalStorage("user");
  const user = getStoredValue();
  if (user.role === role) {
    return children;
  }

  return null;
};

export default CheckPermission;
