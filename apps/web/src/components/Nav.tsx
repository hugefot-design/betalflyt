export default function Nav() {
  return (
    <div className="nav">
      <div className="mx-auto container px-4">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="link text-sm font-semibold tracking-tight">
            BetalFlyt
          </a>
          <div className="flex items-center gap-5 text-sm text-black/70">
            <a className="link" href="/generator">
              Generator
            </a>
            <a className="link" href="/no/faktura-mal">
              Maler
            </a>
            <a className="link" href="/pricing">
              Pris
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
