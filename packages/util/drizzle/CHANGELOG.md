

## 2.0.0 (2026-04-05)


### ⚠ BREAKING CHANGES

* **util-drizzle:** `uuidV7` is now nullable by default. The separate `uuidV7Nullable` helper has been removed — use `uuidV7` directly. To get a non-nullable column, chain `.notNull()` as usual.

### 🚀 Features

* **util-drizzle:** make uuidV7 nullable by default, drop uuidV7Nullable ([ce5becc](https://github.com/alexandr2110pro/space-arch/commit/ce5becc))

### 🧱 Updated Dependencies

* Updated util-ts to 2.0.0

### ❤️ Thank You

* Alexandr Cherednichenko

---

_Versions `0.1.0` – `1.6.1` were released under the previous fixed-versioning scheme — see the workspace history at https://github.com/alexandr2110pro/space-arch/tags._
