'use client';

<<<<<<< HEAD
import { useState, useEffect, useMemo } from 'react';
=======
import { useState, useEffect, useRef, useMemo } from 'react';
>>>>>>> refs/remotes/origin/main
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/wallet-context';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
<<<<<<< HEAD
import { collection, query, orderBy, limit as firestoreLimit, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { CryptoIcon } from '@/components/crypto-icon';
import { KYCVerificationModal } from '@/components/kyc-verification-modal';
import type { KYCStatus } from '@/lib/types';
=======
import { collection, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { CryptoIcon } from '@/components/crypto-icon';
>>>>>>> refs/remotes/origin/main
import {
  Copy, RefreshCw, Loader2, QrCode, Wallet, ExternalLink,
  TrendingUp, TrendingDown, ChevronDown, ChevronRight, FileText,
  Send, ArrowDownToLine, ArrowLeftRight, Banknote,
<<<<<<< HEAD
  ShieldCheck, AlertTriangle, Globe, ShieldAlert, Clock, Info, ArrowRight, CheckCircle2, XCircle,
=======
  ShieldCheck, AlertTriangle, Globe,
>>>>>>> refs/remotes/origin/main
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PrivateRoute } from '@/components/private-route';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { useCurrency } from '@/context/currency-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { marketCoins } from '@/lib/data';
import { currencies } from '@/lib/currencies';
<<<<<<< HEAD
import { useLivePrices } from '@/hooks/use-live-prices';
=======

async function fetchPricesFromApi(
  symbols: string[],
  currency: string,
): Promise<{ prices: Record<string, number>; changes: Record<string, number> }> {
  const res = await fetch(
    `/api/prices?symbols=${symbols.join(',')}&currency=${currency}`,
    { cache: 'no-store' },
  );
  if (!res.ok) throw new Error('Price fetch failed');
  return res.json() as Promise<{ prices: Record<string, number>; changes: Record<string, number> }>;
}
>>>>>>> refs/remotes/origin/main

interface WalletDoc {
  id: string;
  currency: string;
  balance: number;
  address: string;
  lastSynced?: { toDate: () => Date } | null;
}

interface TransactionDoc {
  id: string;
  type: string;
  amount: number;
  amountFiat?: number;
  currency?: string;
  netFiat?: number;
  price?: number;
  timestamp?: { toDate: () => Date } | null;
  status?: string;
  referenceNo?: string;
  carfReference?: string;
  travelRuleTag?: boolean;
  method?: string;
  beneficiaryName?: string;
}

<<<<<<< HEAD
const deriveAddress = (symbol: string, ethAddress: string) => {
  if (!ethAddress) return '';
  if (['ETH', 'LINK', 'BNB', 'USDT', 'USDC', 'UNI'].includes(symbol)) return ethAddress;
  if (symbol === 'SOL') return ethAddress.replace('0x', 'Sol') + 'Identity';
  if (symbol === 'ADA') return 'addr1' + ethAddress.substring(2, 42);
  if (symbol === 'BTC') return '1' + ethAddress.substring(2, 35);
  return 'Identity_' + symbol + '_' + ethAddress.substring(2, 12);
};

=======
>>>>>>> refs/remotes/origin/main
function TransactionHistory({ walletCurrency, userId }: { walletCurrency: string; userId: string }) {
  const firestore = useFirestore();
  const { formatCurrency, currency: fiat } = useCurrency();

  const txQuery = useMemoFirebase(() => {
    if (!firestore || !userId) return null;
    return query(
      collection(firestore, 'users', userId, 'wallets', walletCurrency, 'transactions'),
      orderBy('timestamp', 'desc'),
      firestoreLimit(10)
    );
  }, [firestore, userId, walletCurrency]);

  const { data: transactions, isLoading } = useCollection<TransactionDoc>(txQuery);

  if (isLoading) {
    return (
      <div className="px-4 py-3 space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
<<<<<<< HEAD
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
=======
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
>>>>>>> refs/remotes/origin/main
          </div>
        ))}
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
<<<<<<< HEAD
      <div className="px-4 py-8 text-center bg-white/[0.01]">
        <div className="w-8 h-8 rounded-full bg-muted/10 flex items-center justify-center mx-auto mb-2">
          <FileText className="h-4 w-4 text-muted-foreground/40" />
        </div>
        <p className="text-[11px] text-muted-foreground/60">No recent transactions</p>
=======
      <div className="px-4 py-6 text-center">
        <FileText className="h-5 w-5 mx-auto text-muted-foreground/40 mb-2" />
        <p className="text-[11px] text-muted-foreground/60">No transactions yet</p>
>>>>>>> refs/remotes/origin/main
      </div>
    );
  }

  const getTypeBadgeClasses = (type: string) => {
    switch (type) {
      case 'Withdrawal': return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
      case 'Buy': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Sell': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'Swap': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
<<<<<<< HEAD
      case 'Receive': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
      case 'Send': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
=======
>>>>>>> refs/remotes/origin/main
      default: return 'text-accent border-accent/30 bg-accent/10';
    }
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Failed': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'Pending': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      default: return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    }
  };

  return (
<<<<<<< HEAD
    <div className="px-3 py-2 space-y-2 max-h-[350px] overflow-y-auto scroll-container bg-black/10">
=======
    <div className="px-3 py-2 space-y-1.5 max-h-[300px] overflow-y-auto scroll-container">
>>>>>>> refs/remotes/origin/main
      {transactions.map(tx => {
        const date = tx.timestamp ? tx.timestamp.toDate() : new Date();
        const fiatAmountUSD = tx.amount * (tx.price ?? 0);
        return (
<<<<<<< HEAD
          <div key={tx.id} className="flex items-center justify-between px-3 py-3 rounded-xl glass-module border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 group">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="outline" className={cn('text-[9px] h-4 px-1.5 rounded-md font-medium', getTypeBadgeClasses(tx.type))}>
                  {tx.type}
                </Badge>
                {tx.status && (
                  <Badge variant="outline" className={cn('text-[9px] h-4 px-1.5 rounded-md font-medium', getStatusBadgeClasses(tx.status))}>
=======
          <div key={tx.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl glass-module border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="outline" className={cn('text-[9px] h-4 px-1.5 rounded-md', getTypeBadgeClasses(tx.type))}>
                  {tx.type}
                </Badge>
                {tx.status && (
                  <Badge variant="outline" className={cn('text-[9px] h-4 px-1.5 rounded-md', getStatusBadgeClasses(tx.status))}>
>>>>>>> refs/remotes/origin/main
                    {tx.status}
                  </Badge>
                )}
                {tx.carfReference && (
                  <Badge variant="outline" className="text-[8px] h-4 px-1.5 rounded-md text-purple-400 border-purple-400/30 bg-purple-400/10">
                    CARF
                  </Badge>
                )}
<<<<<<< HEAD
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                {tx.referenceNo ? (
                  <span className="text-[9px] font-mono text-muted-foreground/50 tracking-wide truncate max-w-[100px]">
                    {tx.referenceNo}
                  </span>
                ) : (
                  <span className="text-[9px] text-muted-foreground/30 italic">No ref</span>
                )}
                <span className="text-[10px] text-muted-foreground/40 ml-auto shrink-0 font-medium">
                  {date.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short' })} • {date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p className={cn(
                "text-[11px] font-bold tabular-nums",
                (tx.type === 'Withdrawal' || tx.type === 'Sell' || tx.type === 'Send') ? 'text-red-400/90' : 'text-green-400/90'
              )}>
                {(tx.type === 'Withdrawal' || tx.type === 'Sell' || tx.type === 'Send') ? '−' : '+'}{(tx.amount ?? 0).toFixed(walletCurrency === 'BTC' ? 6 : 4)}
              </p>
              <p className="text-[10px] text-muted-foreground/60 tabular-nums font-medium">
=======
                {tx.travelRuleTag && (
                  <Badge variant="outline" className="text-[8px] h-4 px-1.5 rounded-md text-sky-400 border-sky-400/30 bg-sky-400/10">
                    Travel Rule
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                {tx.referenceNo && (
                  <span className="text-[9px] font-mono text-muted-foreground/50 tracking-wide truncate">
                    {tx.referenceNo}
                  </span>
                )}
                {tx.carfReference && (
                  <span className="text-[8px] font-mono text-purple-400/50 truncate">
                    CARF: {tx.carfReference}
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground/40 ml-auto shrink-0">
                  {date.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-[11px] font-bold tabular-nums">
                {tx.type === 'Withdrawal' || tx.type === 'Sell' ? '−' : '+'}{tx.amount.toFixed(walletCurrency === 'BTC' ? 6 : 4)} {walletCurrency}
              </p>
              <p className="text-[10px] text-muted-foreground/60 tabular-nums">
>>>>>>> refs/remotes/origin/main
                {formatCurrency(fiatAmountUSD * fiat.rate)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MyWalletsPage() {
  const { user, userProfile, syncWalletBalance } = useWallet();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { currency: fiat, formatCurrency, setCurrency } = useCurrency();
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncStep, setSyncStep] = useState<string>('');
  const [selectedQrAddress, setSelectedQrAddress] = useState<{ address: string; currency: string } | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isQrOpen, setIsQrOpen] = useState(false);
<<<<<<< HEAD
  const [expandedTx, setExpandedTx] = useState<Set<string>>(new Set());
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [kycCashOutCurrency, setKycCashOutCurrency] = useState<string | null>(null);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerAddress, setExplorerAddress] = useState<string | null>(null);
  const [explorerCurrency, setExplorerCurrency] = useState<string | null>(null);
=======
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [liveChanges, setLiveChanges] = useState<Record<string, number>>({});
  const [pricesLoading, setPricesLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const initialPricesFetched = useRef(false);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [expandedTx, setExpandedTx] = useState<Set<string>>(new Set());
  const [isPricePolling, setIsPricePolling] = useState(true);
>>>>>>> refs/remotes/origin/main

  const walletsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'wallets'), orderBy('currency', 'asc'));
  }, [user, firestore]);

  const { data: wallets, isLoading } = useCollection<WalletDoc>(walletsQuery);

<<<<<<< HEAD
  const symbols = useMemo(() => (wallets ?? []).map(w => w.currency), [wallets]);
  const { prices: livePrices, changes: liveChanges, isLoading: pricesLoading, isRefreshing: isPricePolling, lastUpdated, refresh: refreshPrices } = useLivePrices(symbols, 'USD');

  // Provisioning logic if wallets are missing
  useEffect(() => {
    if (!isLoading && user && wallets && wallets.length === 0 && !isProvisioning && firestore) {
      const provisionWallets = async () => {
        setIsProvisioning(true);
        try {
          const batch = writeBatch(firestore);
          const ethAddress = userProfile?.walletAddress || '0x' + Math.random().toString(16).slice(2, 42);
          
          marketCoins.forEach(coin => {
            const walletRef = doc(firestore, 'users', user.uid, 'wallets', coin.symbol);
            batch.set(walletRef, {
              id: coin.symbol,
              userId: user.uid,
              currency: coin.symbol,
              balance: 0,
              address: deriveAddress(coin.symbol, ethAddress),
              lastSynced: serverTimestamp()
            }, { merge: true });
          });
          
          await batch.commit();
          toast({ title: "Wallets Provisioned", description: "Your secure storage is ready." });
        } catch (err) {
          console.error("Provisioning failed:", err);
          toast({ title: "Setup Error", description: "Failed to initialize wallets.", variant: "destructive" });
        } finally {
          setIsProvisioning(false);
        }
      };
      provisionWallets();
=======
  const symbolsKey = useMemo(
    () => (wallets ?? []).map(w => w.currency).sort().join(','),
    [wallets],
  );

  useEffect(() => {
    if (!symbolsKey) {
      setPricesLoading(false);
      return;
>>>>>>> refs/remotes/origin/main
    }
  }, [isLoading, user, wallets, isProvisioning, firestore, userProfile, toast]);

<<<<<<< HEAD
  useEffect(() => {
    if (selectedQrAddress?.address) {
      QRCode.toDataURL(selectedQrAddress.address, {
        width: 400,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
        .then(setQrDataUrl)
        .catch(() => setQrDataUrl(''));
    } else {
      setQrDataUrl('');
=======
    const symbols = symbolsKey.split(',');

    async function loadPrices(showSkeleton: boolean) {
      if (showSkeleton) setPricesLoading(true);
      setIsPricePolling(true);
      try {
        const { prices, changes } = await fetchPricesFromApi(symbols, 'USD');
        setLivePrices(prices);
        setLiveChanges(changes);
        setLastUpdated(new Date());
        initialPricesFetched.current = true;
      } catch {
      } finally {
        setPricesLoading(false);
        setIsPricePolling(false);
      }
>>>>>>> refs/remotes/origin/main
    }
  }, [selectedQrAddress]);

<<<<<<< HEAD
=======
    loadPrices(!initialPricesFetched.current);

    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    pollingIntervalRef.current = setInterval(() => loadPrices(false), 60_000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [symbolsKey]);

  useEffect(() => {
    if (selectedQrAddress?.address) {
      QRCode.toDataURL(selectedQrAddress.address, {
        width: 300,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
        .then(setQrDataUrl)
        .catch(() => setQrDataUrl(''));
    } else {
      setQrDataUrl('');
    }
  }, [selectedQrAddress]);

>>>>>>> refs/remotes/origin/main
  const handleCopy = (address: string) => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast({ title: "Address Copied", description: "Wallet address copied to clipboard." });
  };

  const SYNC_STEPS: Record<string, string[]> = {
<<<<<<< HEAD
    ETH: ['Connecting to Ethereum...', 'Scanning smart contracts...', 'Verifying balance...', 'Finalizing...'],
    BTC: ['Connecting to Bitcoin node...', 'Scanning UTXOs...', 'Confirming balance...', 'Finalizing...'],
    SOL: ['Connecting to Solana...', 'Checking account data...', 'Fetching rent-exempt status...', 'Finalizing...'],
    ADA: ['Connecting to Cardano...', 'Syncing ledger state...', 'Calculating rewards...', 'Finalizing...'],
    DEFAULT: ['Initializing connection...', 'Syncing with blockchain...', 'Updating local state...', 'Almost done...'],
  };

  const handleSync = async (currency: string) => {
    if (syncingId) return;
=======
    ETH: ['Connecting...', 'Checking for updates...', 'Verifying balance...', 'Almost done...'],
    BTC: ['Connecting...', 'Checking for updates...', 'Verifying balance...', 'Almost done...'],
    SOL: ['Connecting...', 'Checking for updates...', 'Verifying balance...', 'Almost done...'],
    ADA: ['Connecting...', 'Checking for updates...', 'Verifying balance...', 'Almost done...'],
    DEFAULT: ['Connecting...', 'Verifying balance...', 'Almost done...'],
  };

  const handleSync = async (currency: string) => {
>>>>>>> refs/remotes/origin/main
    setSyncingId(currency);
    const steps = SYNC_STEPS[currency] || SYNC_STEPS.DEFAULT;
    try {
      for (const step of steps) {
        setSyncStep(step);
<<<<<<< HEAD
        await new Promise(r => setTimeout(r, 600 + Math.random() * 600));
      }
      await syncWalletBalance(currency);
      toast({ title: "Balance Updated", description: `${currency} balance has been refreshed.` });
    } catch (err) {
      console.error('Sync error:', err);
=======
        await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
      }
      await syncWalletBalance(currency);
      toast({ title: "Balance Updated", description: `${currency} balance has been refreshed.` });
    } catch {
>>>>>>> refs/remotes/origin/main
      toast({ title: "Refresh Failed", description: "Could not update balance. Please try again.", variant: "destructive" });
    } finally {
      setSyncingId(null);
      setSyncStep('');
    }
  };

  const getChainType = (sym: string) => {
<<<<<<< HEAD
    if (['ETH', 'LINK', 'USDT', 'USDC', 'UNI'].includes(sym)) return 'ERC-20';
    if (['BNB'].includes(sym)) return 'BEP-20';
    if (sym === 'BTC') return 'Bitcoin';
    if (sym === 'SOL') return 'Solana';
    if (sym === 'ADA') return 'Cardano';
    if (sym === 'XRP') return 'Ripple';
    if (sym === 'TRX') return 'TRC-20';
    return 'Native';
  };

  const openExplorer = (address: string, sym: string) => {
    setExplorerAddress(address);
    setExplorerCurrency(sym);
    setExplorerOpen(true);
=======
    if (['ETH', 'LINK', 'USDT'].includes(sym)) return 'ERC-20';
    if (sym === 'BNB') return 'BEP-20';
    if (sym === 'BTC') return 'Bitcoin';
    if (sym === 'SOL') return 'Solana';
    if (sym === 'ADA') return 'Cardano';
    return 'Native';
  };

  const getExplorerLink = (address: string, sym: string) => {
    if (sym === 'ADA') return `https://cardanoscan.io/address/${address}`;
    if (sym === 'SOL') return `https://solscan.io/account/${address}`;
    if (sym === 'BTC') return `https://www.blockchain.com/explorer/addresses/btc/${address}`;
    if (['ETH', 'LINK', 'BNB', 'USDT'].includes(sym)) return `https://etherscan.io/address/${address}`;
    return `/explorer/${address}`;
>>>>>>> refs/remotes/origin/main
  };

  const toggleTx = (currency: string) => {
    setExpandedTx(prev => {
      const next = new Set(prev);
      if (next.has(currency)) next.delete(currency);
      else next.add(currency);
      return next;
    });
  };

<<<<<<< HEAD
  const totalPortfolioUSD = useMemo(() => {
    return wallets?.reduce((sum, w) => {
      const priceUSD = livePrices[w.currency] || marketCoins.find(c => c.symbol === w.currency)?.priceUSD || 0;
      return sum + w.balance * priceUSD;
    }, 0) || 0;
  }, [wallets, livePrices]);

  const USD_TO_ZAR = 18.62;
=======
  const totalPortfolioUSD = wallets?.reduce((sum, w) => {
    const priceUSD = livePrices[w.currency] || marketCoins.find(c => c.symbol === w.currency)?.priceUSD || 0;
    return sum + w.balance * priceUSD;
  }, 0) || 0;

  const USD_TO_ZAR = 18.62;

>>>>>>> refs/remotes/origin/main
  const getFiatValueZAR = (valueUSD: number) => valueUSD * USD_TO_ZAR;

  const selectedCoinName = selectedQrAddress?.currency
    ? marketCoins.find(c => c.symbol === selectedQrAddress.currency)?.name || selectedQrAddress.currency
    : '';

<<<<<<< HEAD
  const kycStatus: KYCStatus = (userProfile?.kycStatus as KYCStatus) || 'NOT_SUBMITTED';

  return (
    <PrivateRoute>
      <div className="space-y-6 pb-20 md:pb-6">
        {/* Header Section */}
        <div className="glass-module rounded-3xl p-6 md:p-8 relative overflow-hidden border border-white/[0.08]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">My Assets</h1>
              </div>
              <p className="text-sm text-muted-foreground/70 font-medium ml-1">Manage and track your secure holdings</p>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <div className="flex items-center gap-2">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground/50 font-bold">Total Portfolio Value</p>
                <div className="flex items-center gap-2">
                  <Select value={fiat.symbol} onValueChange={setCurrency}>
                    <SelectTrigger className="h-7 w-[80px] text-[11px] bg-white/[0.04] border-white/[0.1] rounded-lg px-2 hover:bg-white/[0.08] transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover/95 backdrop-blur-xl border-white/[0.1]">
                      {currencies.map(c => (
                        <SelectItem key={c.symbol} value={c.symbol} className="text-xs">
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span className="font-medium">{c.symbol}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-lg hover:bg-white/[0.08]" 
                    onClick={() => refreshPrices()}
                    disabled={isPricePolling}
                  >
                    <RefreshCw className={cn("h-3.5 w-3.5", isPricePolling && "animate-spin text-primary")} />
                  </Button>
                </div>
              </div>
              
              {isLoading || (pricesLoading && !totalPortfolioUSD) ? (
                <Skeleton className="h-10 w-48 rounded-xl" />
              ) : (
                <div className="flex flex-col md:items-end">
                  <p className="text-3xl md:text-4xl font-bold tracking-tighter tabular-nums text-foreground">
                    {formatCurrency(totalPortfolioUSD * fiat.rate)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400", !isPricePolling && "hidden")}></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-green-500 uppercase">Live Prices</span>
                    </div>
                    {lastUpdated && (
                      <span className="text-[10px] text-muted-foreground/40 font-medium">
                        Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
=======
  return (
    <PrivateRoute>
      <div className="space-y-6">
        <div className="glass-module rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-accent/[0.05] pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold gradient-text">My Assets</h1>
                <div className="flex items-center gap-1.5 ml-2">
                  <span className={cn(
                    "status-dot",
                    isPricePolling ? "text-amber-400" : "text-green-400"
                  )} />
                  <span className="text-[10px] text-muted-foreground/60">
                    {isPricePolling ? 'Updating' : 'Live'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground/70">Manage your cryptocurrency holdings</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {!pricesLoading && totalPortfolioUSD > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">Total Portfolio Value</p>
                    <Select value={fiat.symbol} onValueChange={setCurrency}>
                      <SelectTrigger className="h-6 w-[72px] text-[10px] bg-white/[0.04] border-white/[0.08] rounded-lg px-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(c => (
                          <SelectItem key={c.symbol} value={c.symbol} className="text-xs">
                            {c.flag} {c.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-3xl font-bold gradient-text-primary tabular-nums">
                    {formatCurrency(totalPortfolioUSD * fiat.rate)}
                  </p>
                </>
              )}
              {lastUpdated && (
                <p className="text-[10px] text-muted-foreground/40">
                  Last updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
>>>>>>> refs/remotes/origin/main
              )}
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isLoading || isProvisioning) ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="glass-module rounded-3xl animate-pulse p-6 space-y-6 border border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24 rounded-lg" />
                      <Skeleton className="h-3 w-16 rounded-lg" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-8 w-3/4 rounded-xl" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, j) => <Skeleton key={j} className="h-12 rounded-2xl" />)}
=======
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="glass-module rounded-2xl card-elevated animate-pulse p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
>>>>>>> refs/remotes/origin/main
                </div>
              </div>
            ))
          ) : wallets && wallets.length > 0 ? (
            wallets.map((w) => {
              const priceUSD = livePrices[w.currency] || marketCoins.find(c => c.symbol === w.currency)?.priceUSD || 0;
              const valueUSD = w.balance * priceUSD;
              const valueFiat = valueUSD * fiat.rate;
              const valueZAR = getFiatValueZAR(valueUSD);
              const change = liveChanges[w.currency];
<<<<<<< HEAD
              const coinData = marketCoins.find(c => c.symbol === w.currency);
              const coinName = coinData?.name || w.currency;
=======
              const coinName = marketCoins.find(c => c.symbol === w.currency)?.name || w.currency;
>>>>>>> refs/remotes/origin/main
              const isTxExpanded = expandedTx.has(w.currency);
              const showFicaWarning = valueZAR >= 25000;
              const showTravelRule = valueZAR >= 3000;

              return (
<<<<<<< HEAD
                <Card key={w.id} className="relative overflow-hidden glass-module card-elevated border-white/[0.08] group flex flex-col hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.01] pointer-events-none group-hover:opacity-100 transition-opacity" />

                  <CardHeader className="relative flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-2xl bg-white/[0.03] flex items-center justify-center ring-1 ring-white/[0.08] group-hover:ring-primary/30 transition-all duration-500">
                          <CryptoIcon name={coinName} className="h-7 w-7" />
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold tracking-tight">{coinName}</CardTitle>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] text-muted-foreground/60 font-mono font-bold uppercase tracking-wider">{w.currency}</span>
                          <span className="h-1 w-1 rounded-full bg-white/10" />
                          <span className="text-[10px] text-muted-foreground/40 font-semibold">{getChainType(w.currency)}</span>
                        </div>
                      </div>
                    </div>
                    {change !== undefined && (
                      <div className={cn(
                        "flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border",
                        change >= 0
                          ? "text-green-400 bg-green-400/10 border-green-400/20"
                          : "text-red-400 bg-red-400/10 border-red-400/20"
                      )}>
                        {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(change ?? 0).toFixed(2)}%
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="relative space-y-5 pt-0 flex-1">
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold tabular-nums tracking-tight">
                          {(w.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: w.currency === 'BTC' ? 6 : 4, maximumFractionDigits: w.currency === 'BTC' ? 8 : 4 })}
                        </p>
                        <span className="text-xs font-bold text-muted-foreground/40">{w.currency}</span>
                      </div>
                      <p className="text-base text-muted-foreground/60 tabular-nums font-semibold tracking-tight">
                        {formatCurrency(valueFiat)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap min-h-[20px]">
                      {(() => {
                        const ks = kycStatus;
                        const kycBadgeCfg = {
                          APPROVED:      { cls: 'bg-green-500/10 text-green-400 border-green-500/20',   icon: <ShieldCheck className="h-3 w-3" />,  label: 'Verified'  },
                          PENDING:       { cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20',   icon: <Clock className="h-3 w-3" />,        label: 'Pending'   },
                          REJECTED:      { cls: 'bg-red-500/10 text-red-400 border-red-500/20',         icon: <ShieldAlert className="h-3 w-3" />,  label: 'Rejected'  },
                          NOT_SUBMITTED: { cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20',   icon: <ShieldAlert className="h-3 w-3" />,  label: 'KYC Required'  },
                        }[ks];
                        
                        const kycPopoverContent = {
                          NOT_SUBMITTED: {
                            icon: <ShieldAlert className="h-6 w-6 text-amber-400" />,
                            iconBg: 'bg-amber-500/10',
                            title: 'Verification Required',
                            desc: 'Verify your identity to unlock withdrawals and premium features.',
                            steps: ['Upload SA ID or Passport', 'Submit Proof of Address', 'Get approved in 24 hours'],
                            cta: 'Complete KYC',
                            ctaCls: 'bg-amber-500 text-black hover:bg-amber-400 border-none',
                          },
                          PENDING: {
                            icon: <Clock className="h-6 w-6 text-amber-400" />,
                            iconBg: 'bg-amber-500/10',
                            title: 'Under Review',
                            desc: 'Our compliance team is verifying your documents.',
                            steps: ['Documents received', 'Verification in progress', 'Check back soon'],
                            cta: null,
                          },
                          REJECTED: {
                            icon: <XCircle className="h-6 w-6 text-red-400" />,
                            iconBg: 'bg-red-500/10',
                            title: 'Identity Rejected',
                            desc: 'Your submission did not meet our requirements.',
                            steps: ['Invalid ID document', 'Blurry photo', 'Proof of address expired'],
                            cta: 'Retry Verification',
                            ctaCls: 'bg-red-500 text-white hover:bg-red-400 border-none',
                          },
                          APPROVED: {
                            icon: <CheckCircle2 className="h-6 w-6 text-green-400" />,
                            iconBg: 'bg-green-500/10',
                            title: 'Verified Identity',
                            desc: 'You have full access to all platform features.',
                            steps: ['Full withdrawals active', 'Higher limits enabled', 'Premium support access'],
                            cta: null,
                          },
                        }[ks];

                        return (
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="focus:outline-none transition-transform active:scale-95">
                                <Badge variant="secondary" className={cn('h-6 px-2.5 text-[10px] gap-1.5 rounded-full border font-bold cursor-pointer hover:opacity-80 transition-all', kycBadgeCfg.cls)}>
                                  {kycBadgeCfg.icon}
                                  {kycBadgeCfg.label}
                                </Badge>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-80 p-0 border-white/[0.08] bg-card/95 backdrop-blur-2xl rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                              align="start"
                              sideOffset={12}
                            >
                              <div className="p-5 space-y-4">
                                <div className="flex items-start gap-4">
                                  <div className={cn('h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ring-1 ring-white/[0.1]', kycPopoverContent.iconBg)}>
                                    {kycPopoverContent.icon}
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[13px] font-bold leading-none">{kycPopoverContent.title}</p>
                                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-medium">{kycPopoverContent.desc}</p>
                                  </div>
                                </div>
                                <div className="space-y-2.5">
                                  {kycPopoverContent.steps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                      <div className={cn(
                                        "h-1.5 w-1.5 rounded-full",
                                        ks === 'APPROVED' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' :
                                        ks === 'REJECTED' ? 'bg-red-400' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                                      )} />
                                      <p className="text-[11px] font-bold text-muted-foreground/90">{step}</p>
                                    </div>
                                  ))}
                                </div>
                                {kycPopoverContent.cta && (
                                  <Button
                                    onClick={() => setKycModalOpen(true)}
                                    size="sm"
                                    className={cn(
                                      "w-full h-10 rounded-xl text-xs font-bold gap-2 shadow-lg",
                                      kycPopoverContent.ctaCls
                                    )}
                                  >
                                    {kycPopoverContent.cta}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </Button>
                                )}
                              </div>
                              <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                                <div className="flex items-center justify-center gap-1.5 opacity-40">
                                  <ShieldCheck className="h-3 w-3" />
                                  <p className="text-[10px] font-bold uppercase tracking-widest">Regulated Platform</p>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        );
                      })()}
                      
                      {showFicaWarning && (
                        <Badge variant="secondary" className="h-6 px-2.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 gap-1.5 rounded-full font-bold">
                          <AlertTriangle className="h-3 w-3" />
                          FICA R25k+
                        </Badge>
                      )}
                      
                      {showTravelRule && (
                        <Badge variant="secondary" className="h-6 px-2.5 text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 gap-1.5 rounded-full font-bold">
                          <Globe className="h-3 w-3" />
                          Travel Rule
=======
                <Card key={w.id} className="relative overflow-hidden glass-module card-elevated border-white/[0.06] group flex flex-col hover:border-white/[0.12] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02] pointer-events-none" />

                  <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-white/[0.08]">
                          <CryptoIcon name={coinName} className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold leading-none">{coinName}</CardTitle>
                        <span className="text-xs text-muted-foreground/60 font-mono">{w.currency}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-medium border-white/[0.1] bg-white/[0.03] text-muted-foreground/70 rounded-lg">
                      {getChainType(w.currency)}
                    </Badge>
                  </CardHeader>

                  <CardContent className="relative space-y-4 pt-0 flex-1">
                    <div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold tabular-nums gradient-text">
                              {w.balance.toFixed(w.currency === 'BTC' ? 6 : 4)}
                            </p>
                            <p className="text-sm font-medium text-muted-foreground/50">{w.currency}</p>
                          </div>
                          <p className="text-sm text-muted-foreground/70 mt-0.5 tabular-nums">
                            {pricesLoading ? '—' : formatCurrency(valueFiat)}
                          </p>
                        </div>
                        {change !== undefined && !pricesLoading && (
                          <div className={cn(
                            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg",
                            change >= 0
                              ? "text-green-400 bg-green-400/10"
                              : "text-red-400 bg-red-400/10"
                          )}>
                            {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {Math.abs(change).toFixed(2)}%
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="secondary" className={cn(
                        "h-5 px-2 text-[10px] gap-1 rounded-lg border",
                        userProfile?.walletAddress
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      )}>
                        <ShieldCheck className="h-3 w-3" />
                        {userProfile?.walletAddress ? 'KYC Verified' : 'KYC Pending'}
                      </Badge>
                      {showFicaWarning && (
                        <Badge variant="secondary" className="h-5 px-2 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 gap-1 rounded-lg">
                          <AlertTriangle className="h-3 w-3" />
                          FICA ≥ R25k
                        </Badge>
                      )}
                      {showTravelRule && (
                        <Badge variant="secondary" className="h-5 px-2 text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 gap-1 rounded-lg">
                          <Globe className="h-3 w-3" />
                          Travel Rule ≥ R3k
>>>>>>> refs/remotes/origin/main
                        </Badge>
                      )}
                    </div>

<<<<<<< HEAD
                    <div className="grid grid-cols-4 gap-2.5">
                      <Link
                        href={`/send-receive?currency=${w.currency}&action=send`}
                        className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group/btn"
                      >
                        <div className="h-8 w-8 rounded-xl bg-white/[0.02] flex items-center justify-center group-hover/btn:bg-primary/20 transition-colors">
                          <Send className="h-4 w-4 text-muted-foreground/70 group-hover/btn:text-primary transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground/70 group-hover/btn:text-foreground">Send</span>
                      </Link>
                      
                      <Link
                        href={`/send-receive?currency=${w.currency}&action=receive`}
                        className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 group/btn"
                      >
                        <div className="h-8 w-8 rounded-xl bg-white/[0.02] flex items-center justify-center group-hover/btn:bg-accent/20 transition-colors">
                          <ArrowDownToLine className="h-4 w-4 text-muted-foreground/70 group-hover/btn:text-accent transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground/70 group-hover/btn:text-foreground">Receive</span>
                      </Link>
                      
                      <Link
                        href={`/swap?from=${w.currency}`}
                        className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group/btn"
                      >
                        <div className="h-8 w-8 rounded-xl bg-white/[0.02] flex items-center justify-center group-hover/btn:bg-blue-500/20 transition-colors">
                          <ArrowLeftRight className="h-4 w-4 text-muted-foreground/70 group-hover/btn:text-blue-400 transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground/70 group-hover/btn:text-foreground">Swap</span>
                      </Link>

                      {kycStatus === 'APPROVED' ? (
                        <Link
                          href={`/cash-out?currency=${w.currency}`}
                          className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group/btn"
                        >
                          <div className="h-8 w-8 rounded-xl bg-white/[0.02] flex items-center justify-center group-hover/btn:bg-emerald-500/20 transition-colors">
                            <Banknote className="h-4 w-4 text-muted-foreground/70 group-hover/btn:text-emerald-400 transition-colors" />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground/70 group-hover/btn:text-foreground">Cash Out</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => { setKycCashOutCurrency(w.currency); setKycModalOpen(true); }}
                          className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-amber-500/10 hover:border-amber-500/20 transition-all duration-300 group/btn"
                        >
                          <div className="h-8 w-8 rounded-xl bg-white/[0.02] flex items-center justify-center group-hover/btn:bg-amber-500/20 transition-colors">
                            <ShieldAlert className="h-4 w-4 text-muted-foreground/70 group-hover/btn:text-amber-400 transition-colors" />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground/70 group-hover/btn:text-foreground">Cash Out</span>
                        </button>
                      )}
=======
                    <div className="grid grid-cols-4 gap-1.5">
                      <Link
                        href={`/send-receive?currency=${w.currency}&action=send`}
                        className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-primary/10 hover:border-primary/20 transition-all duration-200 group/btn"
                      >
                        <Send className="h-3.5 w-3.5 text-muted-foreground/60 group-hover/btn:text-primary transition-colors" />
                        <span className="text-[9px] font-medium text-muted-foreground/60 group-hover/btn:text-primary transition-colors">Send</span>
                      </Link>
                      <Link
                        href={`/send-receive?currency=${w.currency}&action=receive`}
                        className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-accent/10 hover:border-accent/20 transition-all duration-200 group/btn"
                      >
                        <ArrowDownToLine className="h-3.5 w-3.5 text-muted-foreground/60 group-hover/btn:text-accent transition-colors" />
                        <span className="text-[9px] font-medium text-muted-foreground/60 group-hover/btn:text-accent transition-colors">Receive</span>
                      </Link>
                      <Link
                        href={`/swap?from=${w.currency}`}
                        className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-200 group/btn"
                      >
                        <ArrowLeftRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover/btn:text-blue-400 transition-colors" />
                        <span className="text-[9px] font-medium text-muted-foreground/60 group-hover/btn:text-blue-400 transition-colors">Swap</span>
                      </Link>
                      <Link
                        href={`/cash-out?currency=${w.currency}`}
                        className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-200 group/btn"
                      >
                        <Banknote className="h-3.5 w-3.5 text-muted-foreground/60 group-hover/btn:text-emerald-400 transition-colors" />
                        <span className="text-[9px] font-medium text-muted-foreground/60 group-hover/btn:text-emerald-400 transition-colors">Cash Out</span>
                      </Link>
>>>>>>> refs/remotes/origin/main
                    </div>
                  </CardContent>

                  <div className="relative border-t border-white/[0.06]">
                    <button
                      onClick={() => toggleTx(w.currency)}
<<<<<<< HEAD
                      className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-bold text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.02] transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-lg bg-white/[0.03] flex items-center justify-center">
                          <FileText className="h-2.5 w-2.5" />
                        </div>
                        <span className="uppercase tracking-widest">Transaction History</span>
                      </div>
                      <div className="flex items-center gap-2">
                         {isTxExpanded ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </button>
                    {isTxExpanded && user && (
                      <div className="animate-in slide-in-from-top-2 duration-300">
                        <TransactionHistory walletCurrency={w.currency} userId={user.uid} />
                      </div>
                    )}
                  </div>

                  <CardFooter className="relative flex gap-2 border-t border-white/[0.06] p-4 bg-white/[0.01]">
                    <Button
                      className="flex-1 bg-white/[0.03] border border-white/[0.08] text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 rounded-2xl text-[11px] h-10 font-bold"
                      variant="ghost" 
=======
                      className="w-full flex items-center justify-between px-5 py-2.5 text-[11px] font-semibold text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.02] transition-all duration-200"
                    >
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3" />
                        <span>Transactions</span>
                      </div>
                      {isTxExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                    {isTxExpanded && user && (
                      <TransactionHistory walletCurrency={w.currency} userId={user.uid} />
                    )}
                  </div>

                  <CardFooter className="relative flex gap-2 border-t border-white/[0.06] py-3 bg-white/[0.01]">
                    <Button
                      className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl text-xs"
                      variant="ghost" size="sm"
>>>>>>> refs/remotes/origin/main
                      onClick={() => handleSync(w.currency)}
                      disabled={syncingId === w.currency}
                    >
                      {syncingId === w.currency ? (
<<<<<<< HEAD
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span className="truncate max-w-[100px]">{syncStep}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>Refresh Wallet</span>
                        </div>
                      )}
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline" 
                        size="icon"
                        className="h-10 w-10 rounded-2xl border-white/[0.08] bg-white/[0.02] hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                        onClick={() => { setSelectedQrAddress({ address: w.address, currency: w.currency }); setIsQrOpen(true); }}
                        disabled={!w.address}
                        title="Show QR Code"
                      >
                        <QrCode className="h-4.5 w-4.5" />
                      </Button>
                      <Button
                        variant="outline" 
                        size="icon"
                        className="h-10 w-10 rounded-2xl border-white/[0.08] bg-white/[0.02] hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                        onClick={() => openExplorer(w.address, w.currency)}
                        disabled={!w.address}
                        title="View on Explorer"
                      >
                        <ExternalLink className="h-4.5 w-4.5" />
                      </Button>
                    </div>
=======
                        <><Loader2 className="mr-1.5 h-3 w-3 animate-spin" /><span className="truncate">{syncStep}</span></>
                      ) : (
                        <><RefreshCw className="mr-1.5 h-3 w-3" /> Refresh</>
                      )}
                    </Button>
                    <Button
                      variant="ghost" size="icon"
                      className="h-8 w-8 rounded-xl border border-white/[0.08] hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                      onClick={() => { setSelectedQrAddress({ address: w.address, currency: w.currency }); setIsQrOpen(true); }}
                      disabled={!w.address}
                      title="Show QR Code"
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Link href={getExplorerLink(w.address, w.currency)} passHref target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="ghost" size="icon"
                        className="h-8 w-8 rounded-xl border border-white/[0.08] hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                        disabled={!w.address}
                        title="View on Explorer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
>>>>>>> refs/remotes/origin/main
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full">
<<<<<<< HEAD
              <div className="glass-module rounded-3xl py-24 text-center space-y-8 border border-white/[0.08] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="relative mx-auto w-fit">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative bg-black/40 p-8 rounded-[32px] ring-1 ring-white/10 shadow-2xl">
                    <Wallet className="h-16 w-16 text-primary animate-bounce" />
                  </div>
                </div>
                <div className="space-y-3 relative">
                  <h3 className="text-2xl font-bold tracking-tight">Provisioning Your Wallets</h3>
                  <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto leading-relaxed font-medium">
                    We're securely generating your blockchain addresses and setting up your ledger. This won't take long.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 relative">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Securing Ledger...</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Hard Refresh
                  </Button>
                </div>
=======
              <div className="glass-module card-elevated rounded-2xl py-20 text-center space-y-5">
                <div className="relative mx-auto w-fit">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                  <div className="relative bg-primary/10 p-5 rounded-full ring-1 ring-white/[0.08]">
                    <Wallet className="h-10 w-10 text-primary/70" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold gradient-text">Setting Up Your Wallets</h3>
                  <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto leading-relaxed">
                    Your secure wallet addresses are being prepared. This usually takes a few seconds.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-white/[0.1] hover:border-primary/30 hover:bg-primary/10"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                </Button>
>>>>>>> refs/remotes/origin/main
              </div>
            </div>
          )}
        </div>

<<<<<<< HEAD
        {/* Global UI Components */}
        <KYCVerificationModal
          open={kycModalOpen}
          onOpenChange={(open) => { setKycModalOpen(open); if (!open) setKycCashOutCurrency(null); }}
          kycStatus={kycStatus}
        />

        <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
          <DialogContent className="sm:max-w-md glass-module border-white/[0.1] rounded-[32px] !bg-card/95 backdrop-blur-3xl p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-8 space-y-6">
              <DialogHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/30">
                      <CryptoIcon name={selectedCoinName} className="h-7 w-7" />
                    </div>
                    <div className="text-left">
                      <DialogTitle className="text-xl font-bold">Receive {selectedQrAddress?.currency}</DialogTitle>
                      <p className="text-sm text-muted-foreground/60 font-medium">Use this address to deposit funds</p>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex flex-col items-center gap-6">
                <div className="p-6 bg-white rounded-3xl shadow-2xl relative group">
                  <div className="absolute -inset-2 bg-primary/10 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  {qrDataUrl ? (
                    <Image 
                      src={qrDataUrl} 
                      alt="Deposit QR" 
                      width={240} 
                      height={240} 
                      className="rounded-lg relative" 
                      priority
                    />
                  ) : (
                    <div className="w-[240px] h-[240px] flex items-center justify-center">
                      <Loader2 className="animate-spin text-primary h-10 w-10" />
                    </div>
                  )}
                </div>

                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Wallet Address</span>
                    <Badge variant="outline" className="text-[9px] font-bold bg-primary/5 border-primary/20 text-primary uppercase">
                      {getChainType(selectedQrAddress?.currency || '')}
                    </Badge>
                  </div>
                  <div 
                    onClick={() => handleCopy(selectedQrAddress?.address || '')}
                    className="p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] rounded-2xl font-mono text-xs break-all text-center text-foreground/80 cursor-pointer transition-all active:scale-[0.98] group"
                  >
                    {selectedQrAddress?.address}
                    <div className="mt-2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">Click to copy</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20"
                  onClick={() => handleCopy(selectedQrAddress?.address || '')}
                >
                  <Copy className="h-4.5 w-4.5" /> 
                  Copy Address
                </Button>
                <div className="flex items-center gap-2 justify-center py-2 px-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  <p className="text-[10px] font-bold text-amber-500/80 leading-tight">
                    Only send {selectedQrAddress?.currency} ({getChainType(selectedQrAddress?.currency || '')}) to this address.
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Integrated Explorer Modal */}
        <Dialog open={explorerOpen} onOpenChange={setExplorerOpen}>
          <DialogContent className="max-w-[95vw] w-full h-[90vh] glass-module border-white/[0.1] rounded-[32px] !bg-card/95 backdrop-blur-3xl p-0 overflow-hidden flex flex-col">
             <div className="flex-1 overflow-y-auto">
                <div className="relative h-full">
                   {explorerAddress && explorerCurrency && (
                      <div className="p-0 h-full">
                         {/* We can use the existing ExplorerContent component by passing props or just including it */}
                         <iframe 
                            src={`/explorer/${explorerAddress}?currency=${explorerCurrency}`} 
                            className="w-full h-full border-none rounded-[32px]"
                            title="Block Explorer"
                         />
                      </div>
                   )}
                </div>
             </div>
             <div className="p-4 border-t border-white/[0.06] flex justify-end">
                <Button variant="ghost" onClick={() => setExplorerOpen(false)} className="rounded-xl">Close Explorer</Button>
             </div>
=======
        <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
          <DialogContent className="sm:max-w-md glass-module border-white/[0.08] rounded-2xl !bg-card/90 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-white/[0.08]">
                  <CryptoIcon name={selectedCoinName} className="h-4 w-4" />
                </div>
                <span>{selectedQrAddress?.currency} Deposit Address</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground/60">
                Share this address to receive {selectedQrAddress?.currency} into your wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl my-4 shadow-lg">
              {qrDataUrl
                ? <Image src={qrDataUrl} alt="Deposit QR" width={220} height={220} className="rounded-lg" />
                : <Loader2 className="animate-spin text-muted-foreground h-10 w-10" />
              }
            </div>
            <div className="p-3 glass-module rounded-xl font-mono text-xs break-all text-center text-foreground/80 border border-white/[0.06]">
              {selectedQrAddress?.address}
            </div>
            <DialogFooter className="mt-2">
              <Button
                className="w-full btn-premium text-white rounded-xl h-10"
                onClick={() => handleCopy(selectedQrAddress?.address || '')}
              >
                <Copy className="h-4 w-4 mr-2" /> Copy Address
              </Button>
            </DialogFooter>
>>>>>>> refs/remotes/origin/main
          </DialogContent>
        </Dialog>
      </div>
    </PrivateRoute>
  );
}
