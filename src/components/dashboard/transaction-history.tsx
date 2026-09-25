
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy, limit } from 'firebase/firestore'
import { useCurrency } from "@/context/currency-context";
import { CryptoIcon } from "../crypto-icon";
<<<<<<< HEAD
import { Loader2, Activity, ArrowUpRight, ArrowDownLeft, Inbox, AlertTriangle } from "lucide-react";
import { marketCoins } from '@/lib/data';
import { useLivePrices } from '@/hooks/use-live-prices';
=======
import { Loader2, Activity, ArrowUpRight, ArrowDownLeft, Inbox } from "lucide-react";
import { marketCoins } from '@/lib/data';
>>>>>>> refs/remotes/origin/main

interface Transaction {
  id: string;
  type: 'Buy' | 'Sell' | 'Withdrawal' | 'Swap' | 'Internal Transfer';
  amount: number;
  price: number;
<<<<<<< HEAD
  currency: string; // Now mandatory at the top level
=======
  currency?: string;
>>>>>>> refs/remotes/origin/main
  timestamp: any;
  status: 'Completed' | 'Pending' | 'Failed' | 'Reconciling';
  notes?: string;
  sender?: string;
  recipient?: string;
  txHash?: string;
}

function generateTxHash(id: string): string {
  const seed = id + 'apex';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += ((seed.charCodeAt(i % seed.length) + i * 7) % 16).toString(16);
  }
  return '0x' + hash;
}

const INCOMING_TYPES = new Set(['Buy', 'Swap', 'Internal Transfer']);

export function TransactionHistory() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { currency, formatCurrency } = useCurrency();
<<<<<<< HEAD

  const transactionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'transactions'), // Query the new centralized collection
      orderBy('timestamp', 'desc'),
      limit(25)
=======
  const [livePrices, setLivePrices] = React.useState<Record<string, number>>({});

  const allTransactionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'wallets', 'ETH', 'transactions'),
      orderBy('timestamp', 'desc'),
      limit(20)
>>>>>>> refs/remotes/origin/main
    );
  }, [user, firestore]);

  const { data: ethTxs, isLoading: ethLoading } = useCollection<Transaction>(allTransactionsQuery);

  const btcTransactionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'wallets', 'BTC', 'transactions'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
  }, [user, firestore]);

  const { data: btcTxs } = useCollection<Transaction>(btcTransactionsQuery);

  const solTransactionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'wallets', 'SOL', 'transactions'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
  }, [user, firestore]);

  const { data: solTxs } = useCollection<Transaction>(solTransactionsQuery);

  const allTransactions = React.useMemo(() => {
    const combined = [
      ...(ethTxs || []).map(t => ({ ...t, currency: 'ETH' })),
      ...(btcTxs || []).map(t => ({ ...t, currency: 'BTC' })),
      ...(solTxs || []).map(t => ({ ...t, currency: 'SOL' })),
    ];
    combined.sort((a, b) => {
      const aTime = a.timestamp?.seconds ?? 0;
      const bTime = b.timestamp?.seconds ?? 0;
      return bTime - aTime;
    });
    return combined.slice(0, 20);
  }, [ethTxs, btcTxs, solTxs]);

  const isLoading = ethLoading;

<<<<<<< HEAD
  const transactionSymbols = React.useMemo(() => {
    if (!transactions) return [];
    return [...new Set(transactions.map(t => t.currency).filter(Boolean))];
  }, [transactions]);

  const { prices: livePrices, error: priceError } = useLivePrices(transactionSymbols);
=======
  React.useEffect(() => {
    const symbols = [...new Set(allTransactions.map(t => t.currency).filter(Boolean))] as string[];
    if (symbols.length === 0) return;
    fetch(`/api/prices?symbols=${symbols.join(',')}&currency=USD`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(({ prices }: { prices: Record<string, number> }) => setLivePrices(prices))
      .catch(() => {});
  }, [allTransactions]);
>>>>>>> refs/remotes/origin/main

  return (
    <Card className="bg-card/50 backdrop-blur-sm overflow-hidden border-border/60">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/40">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" /> Recent Transactions
          </CardTitle>
          <CardDescription className="text-sm">
            Your latest activity across all wallets
          </CardDescription>
        </div>
<<<<<<< HEAD
        {priceError && (
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
        )}
=======
>>>>>>> refs/remotes/origin/main
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[500px] overflow-auto scroll-container">
          <Table>
            <TableHeader className="sticky top-0 bg-background/80 backdrop-blur-md z-10">
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground pl-6">Type</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Asset</TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground">Amount</TableHead>
                <TableHead className="text-right hidden md:table-cell text-xs font-semibold text-muted-foreground">Value</TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
<<<<<<< HEAD
              ) : transactions && transactions.length > 0 ? (
                transactions.map((tx) => {
                  const sym = tx.currency;
=======
              ) : allTransactions.length > 0 ? (
                allTransactions.map((tx) => {
                  const sym = tx.currency || 'ETH';
>>>>>>> refs/remotes/origin/main
                  const coinName = marketCoins.find(c => c.symbol === sym)?.name || sym;
                  const priceUSD = tx.price > 0 ? tx.price : (livePrices[sym] || 0);
                  const valueInCurrency = tx.amount * priceUSD * currency.rate;
                  const txHash = tx.txHash || generateTxHash(tx.id);
                  const isIncoming = INCOMING_TYPES.has(tx.type) && tx.type !== 'Withdrawal';

                  return (
                    <TableRow key={tx.id} className="border-border/30 group hover:bg-muted/20 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg border",
                            isIncoming
                              ? "bg-accent/10 border-accent/20 text-accent"
                              : "bg-primary/10 border-primary/20 text-primary"
                          )}>
                            {isIncoming ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{tx.type}</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {txHash.substring(0, 8)}…{txHash.substring(txHash.length - 4)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CryptoIcon name={coinName} className="h-4 w-4 opacity-80" />
                          <span className="text-sm font-medium text-muted-foreground">{sym}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-sm tabular-nums">
<<<<<<< HEAD
                        <span className={cn(isIncoming ? "text-accent" : "text-foreground", priceError && "text-muted-foreground/70")}>
                          {isIncoming ? '+' : '-'}{(tx.amount ?? 0).toFixed(sym === 'BTC' ? 6 : 4)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell font-mono text-xs text-muted-foreground">
                        {priceError ? 'N/A' : valueInCurrency > 0 ? formatCurrency(valueInCurrency) : '—'}
=======
                        <span className={isIncoming ? "text-accent" : "text-foreground"}>
                          {isIncoming ? '+' : '-'}{tx.amount.toFixed(sym === 'BTC' ? 6 : 4)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell font-mono text-xs text-muted-foreground">
                        {valueInCurrency > 0 ? formatCurrency(valueInCurrency) : '—'}
>>>>>>> refs/remotes/origin/main
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-medium",
                          tx.status === 'Completed' ? "text-accent" : tx.status === 'Failed' ? "text-destructive" : "text-muted-foreground"
                        )}>
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            tx.status === 'Completed' ? "bg-accent" : tx.status === 'Failed' ? "bg-destructive" : "bg-muted-foreground animate-pulse"
                          )} />
                          {tx.status === 'Completed' ? 'Confirmed' : tx.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 text-muted-foreground">
                      <Inbox className="h-10 w-10 opacity-30" />
                      <p className="text-sm">No transactions yet</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
