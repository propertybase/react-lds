# Changelog

## Next
* Add callback when result is added to Lookup. It can manipulate the result that is added
* Clean up callback bindings in Lookup & reduce debounce delay by 100ms

## 1.0.6
* Deprecate DockedComposer
* Add checkboxes
* LDS 2.1.3
* Navigation Component

## 1.0.5
* Prop to disable text alignment in Email Component
* Prop to disable send button in Email Component
* Jest16 / newest eslint

## 1.0.4
* Button Labels in Dropdown Menu

## 1.0.3

* Allow custom buttons in <Email>-Footer
* Add Advanced Lookup Table Layout for <Lookup>
* Lock crucial dependencies to patch-release-range

## 1.0.2

* Make Text Content of Email Component available.
* Update Quill to final 1.0.0

## 1.0.1

* 1.0.0 seems to have been already released.

## 1.0.0

* Make everything ready for public release
* Cleanup of Documentation
* Cleanup of Components
* Cleanup of Tests
* Removal of prefixable HOC

## 0.3.0

* Deprecate `prefixable` and `sldsClasses`
* All components accept `{...rest}`-props and custom `className`
* `Button` now uses flavors instead of `variation`
* `Button`: renamed `is-selected` to `selected`
* `Card`: `header` renamed to `title`
* `Avatar`: Does take a full URL instead of appending to `context.assetBasePath`
* `IconSVG`: assetBasePath is no longer appended `/`. This has to be set in `context.assetBasePath`
* `Menu` / `Picklist` items: `isSelected` renamed to `selected`
* `DataTable/Cell`: `is-resizable` renamed to `resizable`
* `DataTable/Cell`: `dataLabel` renamed to `data-label`
* `Grid/Column`: `*size-of` renamed to `*sizeOf`
* Export `prefixClasses`, `decorators` and `InputRaw`
* Consistent code-style
* Improved test-coverage
* Improved documentation

## 0.2.0

* The detailRow is now optional on <RecordHome>
* Icons now support custom backgrounds

## 0.1.0

* Initial release
