# Random Name Generator

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

To run this application in a server environment, simply just run `npm run vite`.

To run this application outside the server environment - opening the built `.html`, change the `ENVIRONMENT` from `default` constant to `local`.

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

This is a very old idea of not picking a name from certain name tables and does **not** involve machine learning. This simply walks through the given template string and picks a matching template character.

![img](https://user-images.githubusercontent.com/7021295/246472326-ab92ef66-bc89-4c9d-81c2-f4d5f479515b.png)

Given the example template on the image above, a certain amount of names will be generated (up to 50, no need to generate more) of a maximum length of 20 characters.

> The longer the name, the less sense they make, so the recommended setting is to use **at most** 7 template characters per name part.
> This application was obviously not made with real (coherent) names in mind, there's a small chance of getting something nice, but whatever.

---

## RNG Choice

This project features a different PRNG, because the default `Math.random()` in JavaScript does not allow seeding without some manual magic, but since I had a couple PRNG classes ready to use from other project, I just moved them over.

Reasons why **seeded** PRNG is required:

- while editing the template string, we **can not** just randomly pick a new character for each name every time we change something. The seed is stored every time a new generation is requested (on start, on `regenerate` click)
- seeded PRNG allows retaining the same state for all names in the current generation, meaning we can change the names counter as much as we want or change the template string - the names will be generated for the same state regardless of those edits, each internal generator has its own initial seed, which is reused until the user decided to regenerate the names

PRNG classes:

- [ ] TODO: add more classes
- [ ] TODO: document custom PRNG implementation

Available in `./src/Utils/Generators/`. More classes will be implemented in the future to provide some variety. Currently available generators:

- C64
- Mulberry32

> Note on C64: this generator works with a small range of numbers from 0 to 255 and frequent collisions are possible. This generator has a period of 80 (or 81).

The method should not really matter, since the letter tables are short - 20 consonants, 6 vowels.

> Despite `Y` being considered a consonant or a semi-vowel, it will be used as a vowel for generating names, because why not :)

There are many solutions, but that's the first one I had at hand.

> There are possible collisions between the generators, since the temporary PRNG works with small numbers of 0-255.

---

## Recommended templates

Most the random names will *seem* usable from 5 to 7 characters at most.

Some templates, that **might** work:

- Abaaba
- Ababba
- Baabab
- Babaab
- Babbab

Although there are no *real* recommended settings, sometimes even from 4 characters for **almost** any given template, randomly placed `3V+1C` or `3C+1V`, like `Abaa` or `Babb`

![img](https://user-images.githubusercontent.com/7021295/246510576-c6eca24c-e6c4-4772-8f75-d6f77e3a7052.png)

![img](https://user-images.githubusercontent.com/7021295/246510685-5297ddab-31a7-4f0a-ab92-4481cb6a05db.png)

Combining the two templates into one **might** be useful when generating some bizarre Location names:

![img](https://user-images.githubusercontent.com/7021295/246510858-dec61350-6554-4a39-99bb-69ccd38ca67b.png)
