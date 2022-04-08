import { GetStaticProps } from 'next';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const playground = () => {
  return (
    <div>
      <SwaggerUI url="/swagger.json" />
    </div>
  );
};

// TODO: generate swagger API from code
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: null,
    },
  };
};

export default playground;
