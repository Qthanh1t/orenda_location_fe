import AppRouter from "./routers/AppRouter";
import "antd/dist/reset.css";
import "./index.css";
import '@ant-design/v5-patch-for-react-19';

export default function App() {
  return <AppRouter />;
}