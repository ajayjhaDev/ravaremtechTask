import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import AppLayout from './components/layout/AppLayout';
import AddProductPage from './pages/AddProductPage';
import SendProductPage from './pages/SendProductPage';
import NotFound from './pages/NotFound';

const App = () => (
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#52c41a',
          borderRadius: 6,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Menu: {
            itemSelectedBg: '#f0f9eb',
            itemSelectedColor: '#52c41a',
          },
          Button: {
            primaryColor: '#fff',
          },
        },
      }}
    >
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/add-product" replace />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/send-product" element={<SendProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

export default App;
