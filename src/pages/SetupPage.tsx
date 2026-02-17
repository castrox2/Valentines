import React, { useEffect, useMemo, useState } from 'react';
import './SetupPage.css';
import {
  MAX_NO_ATTEMPTS,
  MIN_NO_ATTEMPTS,
  NO_LABEL_STEP,
  ValentineAppConfig,
  buildNoLabels,
  clampMaxNoAttempts,
  createShareCode,
  normalizeConfig,
  parseShareCode,
} from '../config/appConfig';

interface SetupPageProps {
  initialConfig: ValentineAppConfig;
  isFirstLaunch: boolean;
  onSave: (config: ValentineAppConfig) => void;
}

type SetupStatus = {
  type: 'success' | 'error';
  message: string;
};

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const temporaryField = document.createElement('textarea');
    temporaryField.value = text;
    temporaryField.style.position = 'fixed';
    temporaryField.style.left = '-9999px';
    document.body.appendChild(temporaryField);
    temporaryField.focus();
    temporaryField.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(temporaryField);
    return copied;
  } catch {
    return false;
  }
}

function getAttemptRangeLabel(index: number, maxNoAttempts: number): string {
  const start = index * NO_LABEL_STEP;
  const end = Math.min(start + (NO_LABEL_STEP - 1), maxNoAttempts);
  return `${start}-${end}`;
}

const SetupPage: React.FC<SetupPageProps> = ({ initialConfig, isFirstLaunch, onSave }) => {
  const [draftConfig, setDraftConfig] = useState<ValentineAppConfig>(() =>
    normalizeConfig(initialConfig)
  );
  const [importCode, setImportCode] = useState('');
  const [status, setStatus] = useState<SetupStatus | null>(null);

  useEffect(() => {
    setDraftConfig(normalizeConfig(initialConfig));
  }, [initialConfig]);

  const shareCode = useMemo(() => createShareCode(draftConfig), [draftConfig]);
  const sendMessage = useMemo(
    () =>
      [
        'Use this Valentine setup code:',
        shareCode,
        '',
        'Open the app, click "Re-open Customization", paste the code, and click "Import Code".',
      ].join('\n'),
    [shareCode]
  );

  const noLabelRows = useMemo(
    () =>
      draftConfig.noLabels.map((label, index) => ({
        index,
        rangeLabel: getAttemptRangeLabel(index, draftConfig.maxNoAttempts),
        value: label,
      })),
    [draftConfig.maxNoAttempts, draftConfig.noLabels]
  );

  const updateNoLabel = (index: number, value: string) => {
    setDraftConfig((previous) => {
      const nextLabels = [...previous.noLabels];
      nextLabels[index] = value;
      return {
        ...previous,
        noLabels: nextLabels,
      };
    });
  };

  const updateMaxAttempts = (rawValue: string) => {
    const nextMaxAttempts = clampMaxNoAttempts(rawValue);
    setDraftConfig((previous) => ({
      ...previous,
      maxNoAttempts: nextMaxAttempts,
      noLabels: buildNoLabels(nextMaxAttempts, previous.noLabels),
    }));
  };

  const handleCopyShareCode = async () => {
    const copied = await copyToClipboard(shareCode);
    if (copied) {
      setStatus({ type: 'success', message: 'Share code copied to clipboard.' });
    } else {
      setStatus({ type: 'error', message: 'Clipboard copy failed. Copy from the box manually.' });
    }
  };

  const handleCopySendMessage = async () => {
    const copied = await copyToClipboard(sendMessage);
    if (copied) {
      setStatus({ type: 'success', message: 'Ready-to-send message copied to clipboard.' });
    } else {
      setStatus({ type: 'error', message: 'Clipboard copy failed. Try copying the share code only.' });
    }
  };

  const handleImportShareCode = () => {
    const importedConfig = parseShareCode(importCode);
    if (!importedConfig) {
      setStatus({ type: 'error', message: 'Invalid share code. Paste a valid code and try again.' });
      return;
    }

    setDraftConfig(importedConfig);
    setStatus({ type: 'success', message: 'Share code imported successfully.' });
  };

  const handleSave = () => {
    const normalized = normalizeConfig(draftConfig);
    onSave(normalized);
    setStatus({ type: 'success', message: 'Customization saved.' });
  };

  return (
    <div className="setup-container">
      <div className="setup-content">
        <h1 className="setup-title">Customize Before You Send</h1>
        <p className="setup-subtitle">
          Configure the no-button labels and success page text. You can save locally and share this
          setup with a code.
        </p>

        <section className="setup-section">
          <label className="setup-label" htmlFor="maxNoAttempts">
            Maximum No Attempts
          </label>
          <input
            id="maxNoAttempts"
            className="setup-input"
            type="number"
            min={MIN_NO_ATTEMPTS}
            max={MAX_NO_ATTEMPTS}
            step={NO_LABEL_STEP}
            value={draftConfig.maxNoAttempts}
            onChange={(event) => updateMaxAttempts(event.target.value)}
          />
          <p className="setup-hint">
            Attempts are grouped in steps of {NO_LABEL_STEP}, with a hard cap of {MAX_NO_ATTEMPTS}.
          </p>
        </section>

        <section className="setup-section">
          <h2 className="setup-section-title">Success Page Text</h2>
          <label className="setup-label" htmlFor="successTitle">
            Success Title
          </label>
          <input
            id="successTitle"
            className="setup-input"
            value={draftConfig.successTitle}
            onChange={(event) =>
              setDraftConfig((previous) => ({
                ...previous,
                successTitle: event.target.value,
              }))
            }
          />

          <label className="setup-label" htmlFor="successMessage">
            Success Message
          </label>
          <textarea
            id="successMessage"
            className="setup-textarea"
            value={draftConfig.successMessage}
            onChange={(event) =>
              setDraftConfig((previous) => ({
                ...previous,
                successMessage: event.target.value,
              }))
            }
          />

          <label className="setup-label" htmlFor="successPlaceholderText">
            Placeholder Text
          </label>
          <textarea
            id="successPlaceholderText"
            className="setup-textarea"
            value={draftConfig.successPlaceholderText}
            onChange={(event) =>
              setDraftConfig((previous) => ({
                ...previous,
                successPlaceholderText: event.target.value,
              }))
            }
          />
        </section>

        <section className="setup-section">
          <h2 className="setup-section-title">No Button Labels</h2>
          <div className="setup-no-labels">
            {noLabelRows.map((row) => (
              <label key={row.index} className="setup-no-label-row">
                <span className="setup-no-label-attempts">Attempts {row.rangeLabel}</span>
                <input
                  className="setup-input"
                  value={row.value}
                  onChange={(event) => updateNoLabel(row.index, event.target.value)}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="setup-section">
          <h2 className="setup-section-title">Save and Share</h2>
          <p className="setup-hint setup-send-hint">
            Keep it simple: copy one message and send it. The receiver can import the code in this same
            screen.
          </p>
          <div className="setup-actions">
            <button className="setup-button" type="button" onClick={handleCopySendMessage}>
              Copy Send Message
            </button>
            <button className="setup-button" type="button" onClick={handleCopyShareCode}>
              Copy Share Code
            </button>
          </div>

          <label className="setup-label" htmlFor="importCode">
            Import Share Code
          </label>
          <textarea
            id="importCode"
            className="setup-textarea setup-mono"
            value={importCode}
            onChange={(event) => setImportCode(event.target.value)}
            placeholder="Paste a received share code here"
          />

          <button className="setup-button" type="button" onClick={handleImportShareCode}>
            Import Code
          </button>
        </section>

        {status && (
          <p className={`setup-status setup-status-${status.type}`} role="status">
            {status.message}
          </p>
        )}

        <button className="setup-save-button" type="button" onClick={handleSave}>
          {isFirstLaunch ? 'Save and Start' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default SetupPage;
