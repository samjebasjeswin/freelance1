import { getAllEnquiriesAsync } from "@/lib/admin/enquiriesRepo";

export default async function AdminEnquiryPage() {
  const enquiries = await getAllEnquiriesAsync();

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">Enquiry</h1>
        <p className="text-sm text-theme-faint">
          Total: <span className="font-semibold">{enquiries.length}</span>
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div className="p-6 rounded-3xl border border-theme-border/50 bg-white/60 text-theme-faint">
          No enquiries yet.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <div key={e.id} className="p-5 rounded-3xl border border-theme-border/50 bg-white/60 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[12px] font-bold tracking-widest text-theme-faint uppercase">
                    {e.status}
                  </div>
                  <div className="text-lg font-serif font-bold text-theme-text uppercase">{e.productName}</div>
                </div>
                <div className="text-theme-faint text-sm">
                  Qty: <span className="font-semibold">{e.quantity}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-theme-faint uppercase tracking-widest text-[10px] font-bold">Name</div>
                  <div className="font-semibold">{e.name}</div>
                </div>
                <div>
                  <div className="text-theme-faint uppercase tracking-widest text-[10px] font-bold">Email</div>
                  <div className="font-semibold break-all">{e.email}</div>
                </div>
                <div>
                  <div className="text-theme-faint uppercase tracking-widest text-[10px] font-bold">Phone</div>
                  <div className="font-semibold">{e.phone}</div>
                </div>
              </div>

              {e.message ? (
                <div className="pt-2">
                  <div className="text-theme-faint uppercase tracking-widest text-[10px] font-bold">Message</div>
                  <div className="text-sm whitespace-pre-wrap">{e.message}</div>
                </div>
              ) : null}

              <div className="pt-1 text-theme-faint text-[11px] uppercase tracking-widest">
                {new Date(e.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

