# Copilot / AI agent instructions — foodhub

This project is a Vite + React frontend for a simple food-ordering app. Use these targeted notes to be immediately productive when editing or adding code.

- **Big picture**: `src/App.tsx` is the central UI controller: it fetches menu items (`/api/Menu`), holds `cart` and `orders` state, and renders `MenuBrowser`, `Cart`, and `OrderHistory`. Backend API base URL is read from `import.meta.env.VITE_API_BASE_URL` (see `fetch` calls in `App.tsx`).

- **Realtime integration point**: The app now connects to a SignalR endpoint at `http://localhost:5233/order` (also configurable via `VITE_SIGNALR_URL`). See `src/utils/signalr.ts` for the connection helper and how to subscribe to `NewOrder` and `OrderUpdated` events. Update subscriptions there if the backend uses different event names.

- **Key files to inspect when changing orders flow**:
  - `src/App.tsx` — order state, fetch/place order flows, and where SignalR updates merge into state.
  - `src/components/OrderHistory.tsx` — presentation of orders (receives `orders` prop).
  - `src/components/Cart.tsx` — where `onPlaceOrder` is invoked.
  - `src/supabase/functions/server/index.tsx` — examples of server endpoints in this repo; backend may be separate.

- **API shape & assumptions**:
  - Order creation endpoints return the created order as `data` (see `placeOrder` in `App.tsx` using `data.data`).
  - Order objects included in state in `App.tsx` have `id`, `items`, `totalAmount`, `status`, `createdAt`, `updatedAt`. `createdAt`/`updatedAt` may be ISO strings from server.

- **SignalR specifics**:
  - Client helper: `src/utils/signalr.ts`. It exposes `startSignalRConnection()`, `subscribeNewOrder(handler)`, `subscribeOrderUpdated(handler)`, and unsubscribe helpers.
  - Event names used by app: `NewOrder` (new order placed), `OrderUpdated` (order status changed). If backend uses different names, change the helpers accordingly.
  - When integrating handlers in components, rely on the handler to emit payloads shaped like `{ data: { /* order */ } }` or the raw order object (helpers handle both).

- **Dev / run commands**:
  - Start frontend: `npm run dev` (Vite). Ensure `VITE_API_BASE_URL` and optionally `VITE_SIGNALR_URL` are set in your environment for the frontend to reach the backend.
  - Add dependency after merging: `npm install` (we added `@microsoft/signalr`).

- **Conventions & patterns**:
  - Centralized state lives in `App.tsx` and flows down via props (e.g., `orders` → `OrderHistory`). Prefer updating state in `App.tsx` rather than deep child components.
  - Fetch helpers are inline in `App.tsx`; follow existing patterns (use `Authorization: Bearer ${user.accessToken}` header).
  - UI components are dumb/presentational; business logic resides in `App.tsx`.

- **When to modify SignalR behavior**:
  - If the backend's hub URL or event names change, update `src/utils/signalr.ts` and the `useEffect` in `src/App.tsx`.
  - Prefer subscribing/unsubscribing handlers (using `connection.on/off`) rather than rebuilding the connection frequently; the helper uses automatic reconnect.

- **Quick examples**:
  - To add another order event handler in `App.tsx`:
    - import helper and call `subscribeXxx(handler)` after `startSignalRConnection()` resolves.
  - To emit events from client (if needed), use `getConnection()?.invoke('MethodName', payload)` — see `src/utils/signalr.ts#getConnection()`.

If anything in these notes is unclear or you want conventions adjusted (naming, event shapes, env vars), tell me which section to expand or change.
