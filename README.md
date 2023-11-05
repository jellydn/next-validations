# Welcome to next-validations 👋
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
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

- node >=16
- nextjs >= 9

## Install

```sh
yarn add next-validations
```

## Features

- [x] Support [Yup](https://github.com/jquense/yup) validation
- [x] Support [Fastest-Validator](https://github.com/icebob/fastest-validator) validation
- [x] Support [Joi](https://github.com/sideway/joi) validation
- [x] Support [Zod](https://github.com/colinhacks/zod) validation
- [x] Support [Valibot](https://github.com/fabian-hiller/valibot) validation
- [ ] ...

## Usage

### Validation of multiple modes

```sh
yarn add yup joi next-validations
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
  type: 'Yup',
  mode: 'query',
} as const;

const bodySchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const validateBody = {
  schema: bodySchema,
  type: 'Joi',
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
yarn add zod next-validations
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
  type: 'Zod',
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
```


### Validate custom API endpoint with Valibot

```sh
yarn add valibot next-validations
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
  type: 'Valibot',
  mode: 'query',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.query);
};

export default validate(handler)
```


### Validate custom API endpoint with fastest-validator

```sh
yarn add fastest-validator next-validations
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
  schema,
  type: 'FastestValidator',
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
```

### Validate custom API endpoint with joi

```sh
yarn add joi next-connect next-validations
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
  type: 'Joi',
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

## Stargazers

[![Stargazers repo roster for @jellydn/next-validations](https://reporoster.com/stars/jellydn/next-validations)](https://github.com/jellydn/next-validations/stargazers)

## Show your support

Give a ⭐️ if this project helped you!

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://sferadev.com"><img src="https://avatars.githubusercontent.com/u/2181866?v=4?s=100" width="100px;" alt="Alexis Rico"/><br /><sub><b>Alexis Rico</b></sub></a><br /><a href="https://github.com/jellydn/next-validations/commits?author=SferaDev" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!