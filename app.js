(() => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const status = document.getElementById('status');
    const indentSelect = document.getElementById('indent-size');

    function getIndent() {
        const val = indentSelect.value;
        return val === 'tab' ? '\t' : Number(val);
    }

    function setStatus(msg, type) {
        status.textContent = msg;
        status.className = 'status ' + type;
    }

    function clearStatus() {
        status.textContent = '';
        status.className = 'status';
    }

    document.getElementById('btn-format').addEventListener('click', () => {
        const raw = input.value.trim();
        if (!raw) { clearStatus(); output.value = ''; return; }
        try {
            const parsed = JSON.parse(raw);
            output.value = JSON.stringify(parsed, null, getIndent());
            setStatus('JSON formatted successfully.', 'success');
        } catch (e) {
            output.value = '';
            setStatus('Invalid JSON: ' + e.message, 'error');
        }
    });

    document.getElementById('btn-minify').addEventListener('click', () => {
        const raw = input.value.trim();
        if (!raw) { clearStatus(); output.value = ''; return; }
        try {
            const parsed = JSON.parse(raw);
            output.value = JSON.stringify(parsed);
            setStatus('JSON minified successfully.', 'success');
        } catch (e) {
            output.value = '';
            setStatus('Invalid JSON: ' + e.message, 'error');
        }
    });

    document.getElementById('btn-validate').addEventListener('click', () => {
        const raw = input.value.trim();
        if (!raw) { clearStatus(); return; }
        try {
            JSON.parse(raw);
            setStatus('Valid JSON!', 'success');
        } catch (e) {
            setStatus('Invalid JSON: ' + e.message, 'error');
        }
    });

    document.getElementById('btn-copy').addEventListener('click', () => {
        const text = output.value;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setStatus('Copied to clipboard!', 'success');
        });
    });

    document.getElementById('btn-clear').addEventListener('click', () => {
        input.value = '';
        output.value = '';
        clearStatus();
    });
})();
