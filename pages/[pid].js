import { Fragment } from 'react';
import fs from 'fs/promises';
import path from 'path';

function ProductDetailPage({ loadedProduct }) {
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  return {
    props: {
      loadedProduct: data.products.find((product) => product.id === productId),
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const paths = data.products.map((product) => ({
    params: { pid: product.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default ProductDetailPage;
