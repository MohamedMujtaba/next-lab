interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="w-screen flex flex-col space-y-4 p-4">{children}</div>;
};

export default Container;
