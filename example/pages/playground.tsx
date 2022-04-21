import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{ url: string }>(import('swagger-ui-react'), {
  ssr: false,
});

const Playground = () => {
  return <SwaggerUI url="/swagger.json" />;
};

export default Playground;
