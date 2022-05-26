# AdonisJS Honeypot
> A simple way to keep pesky bots from submitting your forms.

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

AdonisJS Honeypot allows you to easily add a honeypot system to your application
to prevent bots from submitting your forms. AdonisJS Honeypot will add fields to your form
that aren't visible to the user, but are to bots! Then, it validates that all fields
have been left untouched. If any fields have been filled, we know a bot has submitted.

## Installation
First install the package as a dependency on your project
```bash
npm i @adocasts.com/adonisjs-bouncer
```
Then configure it within your project
```bash
node ace configure @adocasts.com/adonisjs-bouncer
```

Lastly, add it as a middleware within your project.
```typescript
// start/kernel.ts

Server.middleware.registerNamed({
  honeypot: () => import('@ioc:Adocasts/Honeypot') // 👈
})
```

## Usage
To add honeypot to a form submission, 
first apply the middleware to your route(s).
```typescript
Route
  .post('/signup', 'AuthController.signup')
  .middleware(['honeypot']) // 👈
```
This will require the honeypot fields to be submitted within your request's body.
So, last thing we need to do is add the fields to your form.

When you configured `@adocasts/adonisjs-honeypot` within your project,
we registered a global component named `honeypot`. This single component
will render all the configured honeypot fields and also hide them using CSS
so they're visible to bots, but not to humans.

So, all you need to do is add this component within your form!
```html
<form action="{{ route('auth.signup') }}" method="POST">
  @!component('honeypot') {{-- 👈 --}}

  {{-- ... other form fields ... --}}
</form>
```

Also, be sure to define custom honeypot fields within `config/honeypot.ts`. 
The more realistic the field names the more likely the honeypot is to work. 
However, be sure the field names won't conflict with any fields in your site.
```js
// here are the default fields
fields: ['ohbother', 'ohpiglet', 'ohpoo', 'firstName', 'lastName'],
```

[npm-image]: https://img.shields.io/npm/v/@adocasts.com/adonisjs-honeypot.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@adocasts.com/adonisjs-honeypot "npm"

[license-image]: https://img.shields.io/npm/l/@adocasts.com/adonisjs-honeypot?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
