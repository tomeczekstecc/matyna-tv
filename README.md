# next-template

## user use-case
 - [X] 1. user may see films page
 - [X] 2. admin may add films, remove films, edit films
 - [X] 3. admin may add blogs, remove blogs, edit blogs
        - [X] fields: title, subtitle, content, category, image
        - [ ] features: image upload, comment, like, share, unlike
 - [X] 4. user may see blogs page
 - [X] 5. user may see blog details page
 - [ ] 6. user may search blog
 - [X] 7. user may persist data
         - [X] add trpc
         - [X] prisma
         - [X] add postgres
         - [X] add auth
         - [X] add models
 - [ ] 8. Comments
         - [ ] user may add only one comment per blog
         - [ ] user may remove own comment
         - [ ] user may edit own comment
         - [ ] user may like comment but own
         - [ ] user may unlike comment
         - [ ] admin may remove any comment



A Next.js 13 template for building apps with Radix UI and Tailwind CSS.

## Features

- Radix UI Primitives
- Tailwind CSS
- Fonts with `@next/font`
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Automatic import sorting with `@ianvs/prettier-plugin-sort-imports`

##
cloudinary

## Tailwind CSS Features

- Class merging with `taiwind-merge`
- Animation with `tailwindcss-animate`
- Conditional classes with `clsx`
- Variants with `class-variance-authority`
- Automatic class sorting with `eslint-plugin-tailwindcss`

## Import Sort

The starter comes with `@ianvs/prettier-plugin-sort-imports` for automatically sort your imports.

### Input

```tsx
import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import "@/styles/globals.css"
import { twMerge } from "tailwind-merge"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
```

### Output

```tsx
import * as React from "react"
// React is always first.
import Link from "next/link"
// Followed by next modules.
import { twMerge } from "tailwind-merge"

// Followed by third-party modules
// Space
import "@/styles/globals.css"
// styles
import { NavItem } from "@/types/nav"
// types
import { siteConfig } from "@/config/site"
// config
import { cn } from "@/lib/utils"
// lib
import { buttonVariants } from "@/components/ui/button"

// components
```

### Class Merging

The `cn` util handles conditional classes and class merging.

### Input

```ts
cn("px-2 bg-slate-100 py-2 bg-slate-200")
// Outputs `p-2 bg-slate-200`
```

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
