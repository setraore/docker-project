import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface RuntimeConfig { apiBaseUrl: string; }

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private cfg: RuntimeConfig = { apiBaseUrl: '/api' }; // <-- URL relative
  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    try {
      const loaded = await firstValueFrom(this.http.get<RuntimeConfig>('/assets/config.json'));
      if (loaded?.apiBaseUrl) this.cfg = loaded;
    } catch {}
  }

  get apiBaseUrl(): string { return this.cfg.apiBaseUrl; }
}
