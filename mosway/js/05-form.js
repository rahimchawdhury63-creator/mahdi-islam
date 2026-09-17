/* ============================================================
   MOSWAY — 05. FORM (FormSubmit AJAX → contactwithpaarth)
   ============================================================ */
"use strict";
(function () {
  const $ = (s, c) => (c || document).querySelector(s);
  const ENDPOINT = "https://formsubmit.co/ajax/contactwithpaarth@gmail.com";

  function validate(form) {
    let ok = true;
    const fields = [
      { el: $("#fName"), test: v => v.trim().length >= 2, msg: "Name" },
      { el: $("#fEmail"), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: "Email" },
      { el: $("#fTopic"), test: v => v.trim().length > 0, msg: "Topic" },
      { el: $("#fMessage"), test: v => v.trim().length >= 10, msg: "Message" }
    ];
    fields.forEach(f => {
      const wrap = f.el.closest(".field");
      const valid = f.test(f.el.value);
      wrap.classList.toggle("invalid", !valid);
      if (!valid) {
        ok = false;
        wrap.style.animation = "none"; void wrap.offsetWidth;
        wrap.style.animation = "shakeX .3s";
      }
    });
    return ok;
  }

  function init() {
    const form = $("#contactForm");
    if (!form) return;
    const btn = $("#sendBtn"), status = $("#formStatus");

    // Live-clear errors
    form.addEventListener("input", (e) => {
      const f = e.target.closest(".field"); if (f) f.classList.remove("invalid");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status"; status.innerHTML = "";
      if (!validate(form)) {
        window.MoswaySound && window.MoswaySound.play("error");
        status.classList.add("show", "form-status--err");
        status.textContent = "⚠ Please fix the highlighted fields (message needs 10+ characters).";
        return;
      }
      // Honeypot (bots only)
      if ($("#fWebsite").value) return;

      const label = btn.querySelector(".label");
      btn.disabled = true; label.textContent = "SENDING... ⏳";
      window.MoswaySound && window.MoswaySound.play("click");

      const payload = {
        name: $("#fName").value.trim(),
        email: $("#fEmail").value.trim(),
        topic: $("#fTopic").value,
        gamer_tag: $("#fTag").value.trim(),
        message: $("#fMessage").value.trim(),
        _subject: "⛏ New Mosway Website Message: " + $("#fTopic").value,
        _template: "table",
        _captcha: "false"
      };

      try {
        const ctrl = new AbortController();
        const to = setTimeout(() => ctrl.abort(), 15000);
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
          signal: ctrl.signal
        });
        clearTimeout(to);
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        status.classList.add("show", "form-status--ok");
        status.innerHTML = "✅ <b>Message sent!</b>&nbsp;Thanks for reaching out — Mosway will reply soon. GG!";
        window.MoswaySound && window.MoswaySound.play("success");
        window.MoswayToast && window.MoswayToast("📬 Message delivered", "Your message is on its way to Mosway!", "gold");
        window.MoswayFX && window.MoswayFX.burst(50, "#7cfc00");
      } catch (err) {
        status.classList.add("show", "form-status--err");
        status.innerHTML = "❌ <b>Send failed.</b>&nbsp;Please email directly: <a href=\"mailto:contactwithpaarth@gmail.com\" style=\"color:#ffb3b3\">contactwithpaarth@gmail.com</a>";
        window.MoswaySound && window.MoswaySound.play("error");
      } finally {
        btn.disabled = false; label.textContent = "SEND MESSAGE";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
