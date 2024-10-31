# Welcome to next-validations 👋

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Version](https://img.shields.io/npm/v/next-validations.svg)](https://npmjs.org/package/next-validations)
[![Downloads/week](https://img.shields.io/npm/dw/next-validations.svg)](https://npmjs.org/package/next-validations)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> NextJS API Validations

## 🏠 [Homepage](https://github.com/jellydn/next-validations)

### ✨ [Demo](https://next-validations-demo.productsway.com/)

![https://gyazo.com/bf4582f7b7aa0f0ae67c4cc337c4e974.gif](https://gyazo.com/bf4582f7b7aa0f0ae67c4cc337c4e974.gif)

## Prerequisites

- node >=18
- nextjs >= 9

## Install

```sh
yarn add next-validations
```

## Features

- **Support for Multiple Validation Libraries**: This package is designed to work seamlessly with a variety of popular validation libraries. These include [Yup](https://github.com/jquense/yup), [Fastest-Validator](https://github.com/icebob/fastest-validator), [Joi](https://github.com/sideway/joi), [Zod](https://github.com/colinhacks/zod), and [Valibot](https://github.com/fabian-hiller/valibot). This means you can choose the library that best suits your project's needs.

- **Integration with TypeSchema**: `next-validations` integrates with [TypeSchema - Universal adapter for TypeScript schema validation](https://typeschema.com/). This allows for even more flexibility and compatibility with additional validation libraries.

## Usage

### Validation of multiple modes

```sh
yarn add yup joi next-validations @typeschema/yup @typeschema/yoi
```

```typescript
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { withValidations } from 'next-validations';
import * as yup from 'yup';

const querySchema = yup.object().shape({
  type: yup.string().oneOf(['email', 'sms']).required(),
});

const validateQuery = {
  schema: querySchema,
  mode: 'query',
} as const;

const bodySchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const validateBody = {
  schema: bodySchema,
  mode: 'body',
} as const;

const validate = withValidations([validateQuery, validateBody]);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ ...req.body, ...req.query });
};

export default connect().post(validate(), handler);
```

### Validate custom API endpoint with Yup

```sh
yarn add yup next-validations @typeschema/yup
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
  mode: 'query',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.query);
};

const router = createRouter();

router.post(validate(), handler);

export default router.handler({
  onError: (err, _req, _event) => {
    return new NextResponse('Something broke!', {
      status: (err as any)?.statusCode ?? 500,
    });
  },
});
```

### Validate custom API endpoint with Zod

```sh
yarn add zod next-validations @typeschema/zod
```

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(6),
});

const validate = withValidation({
  schema,
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
```

### Validate custom API endpoint with Valibot

```sh
yarn add valibot next-validations @typeschema/valibot
```

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import * as valibot from 'valibot';

const schema = valibot.object({
  name: valibot.string([valibot.minLength(4)]),
});

const validate = withValidation({
  schema,
  mode: 'query',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.query);
};

export default validate(handler);
```

### Validate custom API endpoint with fastest-validator

```sh
yarn add fastest-validator next-validations @typeschema/fastest-validator
```

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';

const schema = {
  name: { type: 'string', min: 3, max: 255 },
  email: { type: 'email' },
  age: 'number',
};

const validate = withValidation({
  // This is fastest-validator schema, the type is not working nicely with TypeScript
  schema: schema as any,
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
```

### Validate custom API endpoint with joi

```sh
yarn add joi next-connect next-validations @typeschema/joi
```

```typescript
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { withValidation } from 'next-validations';

const schema = Joi.object({
  dob: Joi.date().iso(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const validate = withValidation({
  schema,
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

const router = createRouter();

router.post(validate(), handler);

export default router.handler({
  onError: (err, _req, _event) => {
    return new NextResponse('Something broke!', {
      status: (err as any)?.statusCode ?? 500,
    });
  },
});
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

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jellydn/next-validations&type=Date)](https://star-history.com/#jellydn/next-validations&Date)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://productsway.com/"><img src="https://avatars.githubusercontent.com/u/870029?v=4?s=100" width="100px;" alt="Dung Duc Huynh (Kaka)"/><br /><sub><b>Dung Duc Huynh (Kaka)</b></sub></a><br /><a href="https://github.com/jellydn/next-validations/commits?author=jellydn" title="Code">💻</a> <a href="https://github.com/jellydn/next-validations/commits?author=jellydn" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sferadev.com"><img src="https://avatars.githubusercontent.com/u/2181866?v=4?s=100" width="100px;" alt="Alexis Rico"/><br /><sub><b>Alexis Rico</b></sub></a><br /><a href="https://github.com/jellydn/next-validations/commits?author=SferaDev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/decs"><img src="https://avatars.githubusercontent.com/u/601381?v=4?s=100" width="100px;" alt="André Costa"/><br /><sub><b>André Costa</b></sub></a><br /><a href="https://github.com/jellydn/next-validations/commits?author=decs" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
