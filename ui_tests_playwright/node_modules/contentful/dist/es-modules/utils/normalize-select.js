function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
* sdk relies heavily on sys metadata
* so we cannot omit the sys property on sdk level entirely
* and we have to ensure that at least `id` and `type` are present
* */

export default function normalizeSelect(query) {
  if (!query.select) {
    return query;
  }

  // The selection of fields for the query is limited
  // Get the different parts that are listed for selection
  const allSelects = Array.isArray(query.select) ? query.select : query.select.split(',').map(q => q.trim());
  // Move the parts into a set for easy access and deduplication
  const selectedSet = new Set(allSelects);

  // If we already select all of `sys` we can just return
  // since we're anyway fetching everything that is needed
  if (selectedSet.has('sys')) {
    return query;
  }

  // We don't select `sys` so we need to ensure the minimum set
  selectedSet.add('sys.id');
  selectedSet.add('sys.type');

  // Reassign the normalized sys properties
  return _objectSpread(_objectSpread({}, query), {}, {
    select: [...selectedSet].join(',')
  });
}