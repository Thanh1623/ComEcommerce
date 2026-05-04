export default function ProductIcon({ id, name, className = "w-12 h-12" }: { id: string, name?: string, className?: string }) {
  const safeName = name || '';
  if (id === 'com-tuoi' || safeName.includes('Cốm Tươi')) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-emerald-500`}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>;
  if (id === 'banh-com' || safeName.includes('Bánh Cốm')) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-emerald-500`}><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>;
  if (id === 'com-kho' || safeName.includes('Cốm Khô')) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-emerald-500`}><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 6.3-1.4-1.4"/></svg>;
  return null;
}
