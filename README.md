# Random Name Generator

- [Random Name Generator](#random-name-generator)
  - [Running](#running)
    - [Running the App Locally](#running-the-app-locally)
  - [Overview](#overview)
  - [RNG Choice](#rng-choice)
    - [PRNGs - Disclaimer](#prngs---disclaimer)
  - [Recommended templates](#recommended-templates)
  - [Conclusion](#conclusion)

---

Small TS-React project - simple name generator from random letters.

Names are generated according to the provided `Template String`, which replaces it with corresponding letters from the table:

- `a` - random vowel
- `A` - random vowel - Uppercase
- `b` - random consonant
- `B` - random consonant - Uppercase

Install with:

```plaintext
npm i

// Post-install will also build the source for server environment by default
```

---

## Running

There are two ways of running Vite apps:

- in a server environment
- locally, building for "offline"

> Refer to the [Custom Vite Config](https://github.com/DarkStoorM/Name-Generator/blob/main/vite.config.ts#L27)
> Because Vite builds will not work offline (CORS issue), there are automatic adjustments implemented

To run this application in a server environment, simply just run:

```plaintext
npm run dev
```

For a code watcher, run:

```plaintext
npm run watch
```

Building the source is available from the following command:

```plaintext
npm run build
```

There is an old Linter/Formatter I add to every project, which is a bit outdated in terms of code maintenance. I could move this to Husky, but whatever :)

```plaintext
// This will run Prettier to format the codebase, then ESLint to do some linting
npm run src:fix
```

---

### Running the App Locally

To run this application outside the server environment - opening the built `.html`, navigate to `./vite.config.ts` and change the `ENVIRONMENT` from `default` constant to `local`:

```ts
// Changing this will switch to the "local" mode, allowing the app to open without a server
const ENVIRONMENT: TEnv = "default";
```

After this, run `npm run build` command and the application will be ready under the `/dist/` directory.

This is required as Vite injects a `crossorigin` `module` script:

```html
<script type="module" crossorigin src="/assets/index-be9acde8.js"></script>
```

This **can not** be run locally, because browsers simply reject the `file://` protocol, which also applies to `module` types.

Removing them will require additional adjustment, like re-adding the `defer` attribute.

> `module` type already acts like `defer`, but we can't use the module type, so we have to swap it with a custom vite plugin.

Switching to `local` environment will build the `.html` with a changed script tag:

```html
<script defer src="./assets/index-be9acde8.js"></script>
```

> Notice the changed path from `/` to `./`. which is also required.

---

## Overview

This is a very old idea of not picking a name from certain name tables and does **not** involve machine learning. This simply walks through the given template string and picks a matching template character.

![img](https://user-images.githubusercontent.com/7021295/247234710-2ff84dcc-d221-4981-b5a8-cdbd346a303d.png)

Given the example template on the image above, a certain amount of names will be generated (up to 50, no need to generate more) of a maximum length of 20 characters.

> The longer the name, the less sense they make, so the recommended setting is to use **at most** 7 template characters per name part.
> This application was obviously not made with real (coherent) names in mind, there's a small chance of getting something nice, but whatever.

---

## RNG Choice

This project features different PRNGs, because the default `Math.random()` in JavaScript does not allow seeding without some manual magic, but since I had a couple PRNG classes ready to use from other project, I just moved them over.

Reasons why **seeded** PRNG is required:

- while editing the template string, we **can not** just randomly pick a new character for each name every time we change something. The seed is stored every time a new generation is requested (on start, on `regenerate` click)
- seeded PRNG allows retaining the same state for all names in the current generation, meaning we can change the names counter as much as we want or change the template string - the names will be generated for the same state regardless of those edits, each internal generator has its own initial seed, which is reused until the user decided to regenerate the names

PRNG classes:

Currently available generators: `./src/Utils/Generators/`

- C64
- Jenkin's Small Fast
- Mulberry32
- Multiply With Carry
- Simple Fast Counter
- Xoshiro128"

> Note on C64: this generator works with a small range of numbers from 0 to 255 and frequent collisions are possible. This generator has a period of 73.

The picked number generator should not really matter, since the letter tables are short - 21 consonants, 5 vowels, but there is a chance, that one generator will work better for some templates than the others

> ~~Despite `Y` being considered a consonant or a semi-vowel, it will be used as a vowel for generating names, because why not :)~~
> Upon further testing, `y` has been moved back to the `consonants table`, because it actually turned out to be a bad idea.

There are many solutions, but that's the first one I had at hand - adding seeded PRNGs, because I wanted the generators to retain their states on every change until prompted.

### PRNGs - Disclaimer

I **do not** guarantee, that the pseudo-random number generators were implemented correctly, I just wrote tests for all generators with the distribution output to make sure they do their thing, but do they do that correctly, I don't know ツ.

All generators (except C64) will yield pretty similar results, so the algorithm won't really matter.

---

## Recommended templates

Most the random names will *seem* usable from 5 to 7 characters at most.

Some templates, that **might** work:

- Abaaba
- Ababba
- Baabab
- Babaab
- Babbab

Although there are no *real* recommended settings, sometimes even from just 4 characters for **almost** any given template, randomly placed `3V+1C` or `3C+1V`, like `Abaa` or `Babb` can give something usable.

![obimhraz](https://user-images.githubusercontent.com/7021295/247231148-235b524f-2347-478c-b695-6078e30c406a.png)

![img](https://user-images.githubusercontent.com/7021295/247231351-2f4d3508-e168-46a2-b2c9-d04f7e7968a6.png)

Combining the two templates into one **might** be useful when generating some bizarre Location meme names, but the chance is low:

![img](https://user-images.githubusercontent.com/7021295/247232365-4db41104-029f-4159-9b09-7903b7fdb0d3.png)

---

## Conclusion

Obviously, the quality of the names is not satisfying, but this is just one of those `yet another time killer` projects, don't rely on this.
