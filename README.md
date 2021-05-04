# Welcome to next-validations 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> NextJS API Validations

### 🏠 [Homepage](https://next-validations.productsway.com/)

### ✨ [Demo](https://next-validations-demo.productsway.com/)

![https://gyazo.com/bf4582f7b7aa0f0ae67c4cc337c4e974.gif](https://gyazo.com/bf4582f7b7aa0f0ae67c4cc337c4e974.gif)

## Prerequisites

- node >=10
- nextjs >= 9

## Install

```sh
yarn add next-validations
```

## Features

- [x] Support [Yup](https://github.com/jquense/yup) validation
- [ ] Support [Fastest-Validator](https://github.com/icebob/fastest-validator) validation
- [ ] Support [Joi](https://github.com/sideway/joi) validation
- [ ] ...

## Usage

### Validate custom API endpoint with Yup

```sh
yarn add yup next-validations
```

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const validate = withValidation({
  schema,
  type: 'Yup',
  mode: 'query',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.query);
};

export default validate(handler);
```

## Run tests

```sh
yarn test
```

## Author

👤 **Huynh Duc Dung**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

Give a ⭐️ if this project helped you!

[![support us](https://img.shields.io/badge/become-a patreon%20us-orange.svg?cacheSeconds=2592000)](https://www.patreon.com/jellydn)

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
