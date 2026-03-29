export async function loadCatalog(locale: string) {
  const catalog = await import(`@lingui/loader!../locales/${locale}.po`);
  return catalog.messages;
}
