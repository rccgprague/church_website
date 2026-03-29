import { ListItemBuilder, StructureBuilder } from "sanity/desk";

const CUSTOM_ITEMS = [
  { id: "live", title: "Live Event" },
  { id: "home", title: "Homepage" },
];

const customItemIds = CUSTOM_ITEMS.map((item) => item.id);

const getCustomStructureList = (S: StructureBuilder) =>
  CUSTOM_ITEMS.map((item) =>
    S.listItem()
      .title(item.title)
      .child(S.document().schemaType(item.id).documentId(item.id))
  );

const removeCustomItems = (item: ListItemBuilder) =>
  !customItemIds.includes(item.getId() ?? "");

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Site Content")
    .items([
      ...getCustomStructureList(S),
      ...S.documentTypeListItems()
        .reverse()
        .filter((item) => removeCustomItems(item)),
    ]);

export default structure;
