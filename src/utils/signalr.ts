import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

type OrderPayload = any; // keep generic — App.tsx provides concrete shape

let connection: HubConnection | null = null;

export async function startSignalRConnection(url?: string, accessToken?: string) {
  const endpoint = url || (import.meta.env.VITE_SIGNALR_URL as string) || 'http://localhost:5233/order';

  // If an existing connection exists but we now have an access token, restart so the token is applied.
  if (connection) {
    // If connection already running and no token requested, reuse it
    if (!accessToken) return connection;
    try {
      await connection.stop();
    } catch (e) {
      console.warn('Error stopping existing SignalR connection before restart', e);
    }
    connection = null;
  }

  const builder = new HubConnectionBuilder().configureLogging(LogLevel.Information).withAutomaticReconnect();

  if (accessToken) {
    builder.withUrl(endpoint, {
      accessTokenFactory: () => accessToken,
    });
  } else {
    builder.withUrl(endpoint);
  }

  connection = builder.build();

  connection.onreconnecting((err) => {
    console.warn('SignalR reconnecting', err);
  });

  connection.onreconnected(() => {
    console.info('SignalR reconnected');
  });

  connection.onclose((err) => {
    console.info('SignalR connection closed', err);
    connection = null;
  });

  await connection.start();
  console.info('SignalR connected to', endpoint, accessToken ? '(with access token)' : '(no token)');
  return connection;
}



export function subscribeOrderUpdated(handler: (payload: OrderPayload) => void) {
  // Some backends emit different event names. Listen for both common variants.
  connection?.on('OrderUpdated', handler);
  connection?.on('ReceiveOrderUpdated', handler);
}

export function subscribeNewOrder(handler: (payload: OrderPayload) => void) {
  connection?.on('NewOrder', handler);
}

export function unsubscribeNewOrder(handler: (payload: OrderPayload) => void) {
  connection?.off('NewOrder', handler);
}

export function unsubscribeOrderUpdated(handler: (payload: OrderPayload) => void) {
  connection?.off('OrderUpdated', handler);
  connection?.off('ReceiveOrderUpdated', handler);
}

export async function stopSignalRConnection() {
  if (!connection) return;
  try {
    await connection.stop();
  } finally {
    connection = null;
  }
}

export function getConnection() {
  return connection;
}
