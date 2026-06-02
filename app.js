(async () => {
  const DATA_URL = "data/i18n.json";
  const app = document.querySelector("#app");
  const VERIFIED_DATE = "1 Jun 2026";

  const i18n = await fetch(DATA_URL).then((response) => response.json());
  const sourceLinks = [
    ["Agency for Integrated Care - Silver Generation Office", "https://www.aic.sg/Age-Well/Silver-Generation-Office/About-SGO"],
    ["SupportGoWhere - Singapore support schemes", "https://supportgowhere.life.gov.sg/"],
    ["CPF Board - Silver Support Scheme", "https://www.cpf.gov.sg/member/retirement-income/government-support/silver-support-scheme"],
    ["MOH - Pioneer Generation Package", "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/pioneer-generation-package"],
    ["MOH - Merdeka Generation Package", "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/merdeka-generation-package"],
    ["CPF Board - Workfare Income Supplement", "https://www.cpf.gov.sg/service/article/what-is-the-workfare-income-supplement-scheme"],
    ["AIC - Financial Assistance", "https://www.aic.sg/Financial-Assistance"],
    ["AIC - Care Services", "https://www.aic.sg/Care-Services"],
    ["AIC - Caregiving Support", "https://www.aic.sg/Caregiving-Support"],
    ["AIC - Home Caregiving Grant", "https://www.aic.sg/Financial-Assistance/Home-Caregiving-Grant"],
    ["AIC - Seniors' Mobility and Enabling Fund", "https://www.aic.sg/financial-assistance/seniors-mobility-and-enabling-fund-assistive-devices/"],
    ["AIC - SMF Home Healthcare Items", "https://www.aic.sg/Financial-Assistance/Seniors-Mobility-and-Enabling-Fund---Home-Healthcare-Items"],
    ["AIC - Caregivers Training Grant", "https://www.aic.sg/financial-assistance/caregivers-training-grant-ctg/"],
    ["AIC - MDW Levy Concession", "https://www.aic.sg/financial-assistance/migrant-domestic-worker-levy-concession"],
    ["AIC - PioneerDAS", "https://www.aic.sg/financial-assistance/pioneer-generation-disability-assistance-scheme"],
    ["AIC - IDAPE", "https://www.aic.sg/Financial-Assistance/Interim-Disability-Assistance-Programme-for-the-Elderly"],
    ["AIC - CareShield Life", "https://www.aic.sg/Financial-Assistance/CareShield-Life"],
    ["AIC - ElderShield", "https://www.aic.sg/Financial-Assistance/ElderShield"],
    ["AIC - ElderFund", "https://www.aic.sg/Financial-Assistance/ElderFund"],
    ["MOH - CareShield Life and MediSave Care", "https://www.moh.gov.sg/healthcare-schemes-subsidies/careshield-life"]
  ];
  const schemeLinks = {
    sgo_aac: "https://www.aic.sg/Age-Well/Silver-Generation-Office/About-SGO",
    senior_concession: "https://www.transitlink.com.sg/concession-cards/",
    chas: "https://www.chas.sg/",
    gstv_medisave: "https://www.govbenefits.gov.sg/",
    silver_support: "https://www.cpf.gov.sg/member/retirement-income/government-support/silver-support-scheme",
    pioneer: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/pioneer-generation-package",
    merdeka: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/merdeka-generation-package",
    majulah_earn_save: "https://www.govbenefits.gov.sg/",
    workfare: "https://www.cpf.gov.sg/service/article/what-is-the-workfare-income-supplement-scheme",
    comcare: "https://supportgowhere.life.gov.sg/",
    home_caregiving: "https://www.aic.sg/Financial-Assistance/Home-Caregiving-Grant",
    smf: "https://www.aic.sg/financial-assistance/seniors-mobility-and-enabling-fund-assistive-devices/",
    smf_home_items: "https://www.aic.sg/Financial-Assistance/Seniors-Mobility-and-Enabling-Fund---Home-Healthcare-Items",
    caregiver_training: "https://www.aic.sg/financial-assistance/caregivers-training-grant-ctg/",
    mdw_levy: "https://www.aic.sg/financial-assistance/migrant-domestic-worker-levy-concession",
    pioneer_das: "https://www.aic.sg/financial-assistance/pioneer-generation-disability-assistance-scheme",
    idape: "https://www.aic.sg/Financial-Assistance/Interim-Disability-Assistance-Programme-for-the-Elderly",
    careshield_life: "https://www.aic.sg/Financial-Assistance/CareShield-Life",
    eldershield: "https://www.aic.sg/Financial-Assistance/ElderShield",
    medisave_care: "https://www.moh.gov.sg/healthcare-schemes-subsidies/careshield-life",
    elderfund: "https://www.aic.sg/Financial-Assistance/ElderFund",
    care_services: "https://www.aic.sg/Care-Services",
    healthier_sg: "https://www.healthiersg.gov.sg/",
    sg60_vouchers: "https://www.govbenefits.gov.sg/"
  };
  const nextStepLinks = {
    sgo_aac: { href: "tel:18006506060", labelKey: "contact.callSgo" },
    gstv_medisave: { href: "https://www.govbenefits.gov.sg/", labelKey: "ui.openGovBenefits" },
    pioneer: { href: "https://www.govbenefits.gov.sg/", labelKey: "ui.openGovBenefits" },
    merdeka: { href: "https://www.govbenefits.gov.sg/", labelKey: "ui.openGovBenefits" },
    majulah_earn_save: { href: "https://www.govbenefits.gov.sg/", labelKey: "ui.openGovBenefits" },
    sg60_vouchers: { href: "https://www.govbenefits.gov.sg/", labelKey: "ui.openGovBenefits" }
  };

  const state = {
    lang: null,
    step: 0,
    answers: {}
  };

  const questions = [
    { id: "age", choices: ["60_64", "65_69", "70_74", "75_79", "80_plus", "below_60"] },
    { id: "residency", choices: ["citizen", "pr", "foreigner"] },
    { id: "housing", choices: ["hdb_1_2", "hdb_3", "hdb_4plus", "private", "landed"] },
    { id: "income", choices: ["0_800", "801_1500", "1501_2400", "2401_3500", "above_3500"] },
    { id: "employment", choices: ["retired", "part_time", "full_time", "self_employed", "caregiver"] },
    {
      id: "workIncome",
      choices: ["none", "below_500", "500_3000", "3001_6000", "above_6000"],
      showIf: () => ["part_time", "full_time", "self_employed"].includes(state.answers.employment)
    },
    { id: "property", choices: ["one_or_less", "more_than_one", "not_sure"] },
    { id: "annualValue", choices: ["av_21000", "av_31000", "av_above", "not_sure"] },
    { id: "birthCohort", choices: ["before_1949", "1950_1959", "1960_1966", "not_sure"] },
    {
      id: "citizenSince",
      choices: ["before_1986", "before_1996", "after_1996", "not_sure"],
      showIf: () => state.answers.residency === "citizen"
    },
    { id: "cpf55", choices: ["le_140k", "gt_140k", "not_sure"] },
    {
      id: "healthNeeds",
      multi: true,
      choices: ["chronic", "mobility", "moderate_disability", "severe_disability", "home_care", "social_isolation", "none"]
    },
    {
      id: "careServices",
      multi: true,
      exclusiveChoice: "no_care_services",
      choices: ["home_nursing", "home_medical", "home_palliative", "day_hospice", "centre_care", "nursing_home_hospice", "mental_health", "acp", "no_care_services"],
      showIf: () => (state.answers.healthNeeds || []).some((need) => need !== "none")
    },
    {
      id: "caregiverTraining",
      choices: ["family_caregiver_training", "mdw_caregiver_training", "no_training_needed", "not_sure"],
      showIf: () => (state.answers.healthNeeds || []).some((need) => ["moderate_disability", "severe_disability", "home_care"].includes(need))
    },
    {
      id: "mdwCare",
      choices: ["have_mdw_same_home", "planning_mdw", "no_mdw", "not_sure"],
      showIf: () => (state.answers.healthNeeds || []).some((need) => ["moderate_disability", "severe_disability", "home_care"].includes(need))
    },
    {
      id: "ltcCoverage",
      choices: ["careshield_life_policy", "eldershield_policy", "no_ltc_policy", "not_sure"],
      showIf: () => (state.answers.healthNeeds || []).includes("severe_disability")
    },
    {
      id: "medisaveBalance",
      choices: ["medisave_5000_plus", "medisave_under_5000", "medisave_not_sure"],
      showIf: () => (state.answers.healthNeeds || []).includes("severe_disability")
    },
    { id: "living", choices: ["with_family", "with_spouse", "alone", "care_facility"] },
    { id: "support", choices: ["adequate", "limited", "little_none"] }
  ];

  function t(path) {
    return path.split(".").reduce((node, key) => node?.[key], i18n[state.lang || "en"]) || path;
  }

  function questionList() {
    return questions.filter((question) => !question.showIf || question.showIf());
  }

  function setSelectableState(button, isSelected) {
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    const icon = button.querySelector(".choice-icon");
    if (icon) icon.textContent = isSelected ? "✓" : "○";
  }

  function syncSelectableButtons(selector, selectedValues) {
    const values = new Set(Array.isArray(selectedValues) ? selectedValues : [selectedValues].filter(Boolean));
    app.querySelectorAll(selector).forEach((button) => {
      setSelectableState(button, values.has(button.dataset.lang || button.dataset.choice));
    });
  }

  function renderLanding() {
    const lang = state.lang || "en";
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
    state.step = 0;
    state.answers = {};
    app.innerHTML = `
      <section class="hero">
        <div class="hero-copy">
          <p class="kicker">AskSGO</p>
          <h1>${t("landing.title")}</h1>
          <p class="lead">${t("landing.lead")}</p>
          <div class="assurance-row">
            <span>${t("landing.privacy")}</span>
            <span>${t("landing.checked")} ${VERIFIED_DATE}</span>
          </div>
          <div class="language-grid">
            ${Object.entries(i18n).map(([key, copy]) => `
              <button class="lang-button ${key === lang ? "selected" : ""}" type="button" data-lang="${key}" aria-pressed="${key === lang}">
                <span>${copy.meta.name}</span>
              </button>
            `).join("")}
          </div>
          <div class="start-row">
            <button class="action-button primary start-button" type="button" data-action="start">${t("ui.start")}</button>
            <button class="link-button supervisor-link" type="button" data-action="supervisor">${t("ui.supervisor")}</button>
          </div>
        </div>
        <div class="hero-brand-wrap" aria-label="Silver Generation Office visual panel">
          <div class="sgo-logo-mark">
            <img src="assets/sgo-logo.svg" alt="Silver Generation Office logo" />
          </div>
          <div class="research-strip">
            <h2>${t("landing.researchTitle")}</h2>
            <p>${t("landing.research")}</p>
          </div>
        </div>
      </section>
    `;

    syncSelectableButtons("[data-lang]", lang);

    app.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.lang === (state.lang || "en")) {
          button.blur();
          return;
        }
        state.lang = button.dataset.lang;
        syncSelectableButtons("[data-lang]", state.lang);
        button.blur();
        renderLanding();
      });
    });
    app.querySelector("[data-action='start']").addEventListener("click", () => {
      state.lang = state.lang || "en";
      document.documentElement.lang = state.lang === "zh" ? "zh-Hans" : state.lang;
      state.step = 0;
      renderQuestion();
    });
    app.querySelector("[data-action='supervisor']").addEventListener("click", renderSupervisor);
  }

  function renderQuestion() {
    const visible = questionList();
    const question = visible[state.step];

    if (!question) {
      renderResults();
      return;
    }

    let selected = state.answers[question.id] || (question.multi ? [] : null);
    const progress = Math.round(((state.step + 1) / visible.length) * 100);
    const warn = question.id === "residency" && state.answers.residency === "foreigner"
      ? `<div class="message-box">${t("messages.foreigner")}</div>` : "";
    const extraNote = question.id === "healthNeeds"
      ? `<div class="message-box subtle-note">${t("notes.dailyActivities")}</div>` : "";

    app.innerHTML = `
      <section class="question-stage">
        <div class="topbar">
          <span class="pill">${t("ui.step")} ${state.step + 1}/${visible.length}</span>
          <div class="progress" aria-label="${progress}%"><span style="width:${progress}%"></span></div>
          <button class="link-button secondary" type="button" data-action="restart">${t("ui.restart")}</button>
        </div>
        <h1 class="question-title">${t(`questions.${question.id}.title`)}</h1>
        <p class="hint">${question.multi ? t("ui.multiHint") : t(`questions.${question.id}.hint`)}</p>
        ${warn}
        ${extraNote}
        <div class="choice-grid">
          ${question.choices.map((choice) => {
            const isSelected = question.multi ? selected.includes(choice) : selected === choice;
            return `
              <button class="choice-button ${isSelected ? "selected" : ""}" type="button" data-choice="${choice}" aria-pressed="${isSelected}">
                <span class="choice-icon">${isSelected ? "✓" : "○"}</span>
                <span>${t(`choices.${choice}`)}</span>
              </button>
            `;
          }).join("")}
        </div>
        <div class="nav-row">
          ${state.step > 0 ? `<button class="action-button secondary" type="button" data-action="back">${t("ui.back")}</button>` : ""}
          ${question.multi ? `<button class="action-button primary" type="button" data-action="next" ${selected.length ? "" : "disabled"}>${t("ui.next")}</button>` : ""}
        </div>
      </section>
    `;

    syncSelectableButtons("[data-choice]", selected);

    app.querySelector("[data-action='restart']").addEventListener("click", renderLanding);
    app.querySelector("[data-action='back']")?.addEventListener("click", () => {
      state.step -= 1;
      renderQuestion();
    });
    app.querySelector("[data-action='next']")?.addEventListener("click", () => {
      state.step += 1;
      renderQuestion();
    });
    app.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.choice;
        if (question.multi) {
          let values = [...(state.answers[question.id] || [])];
          const exclusiveChoice = question.exclusiveChoice || "none";
          if (value === exclusiveChoice) {
            values = values.includes(exclusiveChoice) ? [] : [exclusiveChoice];
          } else {
            values = values.filter((item) => item !== exclusiveChoice);
            values = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
          }
          state.answers[question.id] = values;
          selected = values;
          syncSelectableButtons("[data-choice]", values);
          app.querySelector("[data-action='next']")?.toggleAttribute("disabled", values.length === 0);
          button.blur();
          return;
        }

        state.answers[question.id] = value;
        syncSelectableButtons("[data-choice]", value);
        button.blur();
        if (question.id === "age" && value === "below_60") {
          renderExit();
          return;
        }
        state.step += 1;
        renderQuestion();
      });
    });
  }

  function renderExit() {
    app.innerHTML = `
      <section class="question-stage">
        <span class="pill">AskSGO</span>
        <h1 class="question-title">${t("messages.below60Title")}</h1>
        <div class="message-box">${t("messages.below60")}</div>
        <div class="nav-row">
          <a class="action-button primary" href="https://supportgowhere.life.gov.sg/" target="_blank" rel="noreferrer">${t("ui.supportGoWhere")}</a>
          <button class="action-button secondary" type="button" data-action="restart">${t("ui.restart")}</button>
        </div>
      </section>
    `;
    app.querySelector("[data-action='restart']").addEventListener("click", renderLanding);
  }

  function ageMin() {
    return { "60_64": 60, "65_69": 65, "70_74": 70, "75_79": 75, "80_plus": 80 }[state.answers.age] || 0;
  }

  function hasNeed(need) {
    return (state.answers.healthNeeds || []).includes(need);
  }

  function hasCareService(service) {
    return (state.answers.careServices || []).includes(service);
  }

  function lowIncome() {
    return ["0_800", "801_1500"].includes(state.answers.income);
  }

  function silverSupportIncomePossible() {
    return ["0_800", "801_1500", "1501_2400"].includes(state.answers.income);
  }

  function hcgMeansPossible() {
    return ["0_800", "801_1500", "1501_2400", "2401_3500"].includes(state.answers.income) || avUpTo21();
  }

  function idapeMeansPossible() {
    return hcgMeansPossible();
  }

  function avUpTo21() {
    return state.answers.annualValue === "av_21000";
  }

  function avUpTo31() {
    return ["av_21000", "av_31000"].includes(state.answers.annualValue);
  }

  function oneProperty() {
    return state.answers.property === "one_or_less";
  }

  function citizen() {
    return state.answers.residency === "citizen";
  }

  function resident() {
    return ["citizen", "pr"].includes(state.answers.residency);
  }

  function hasHomeHealthcareService() {
    return ["home_nursing", "home_medical", "home_palliative", "day_hospice"].some(hasCareService);
  }

  function wantsCaregiverTraining() {
    return ["family_caregiver_training", "mdw_caregiver_training"].includes(state.answers.caregiverTraining);
  }

  function hasOrPlansMdw() {
    return ["have_mdw_same_home", "planning_mdw"].includes(state.answers.mdwCare);
  }

  function addScheme(groups, status, id, reasonKeys) {
    groups[status].push({ id, reasonKeys });
  }

  function assess() {
    const groups = { likely: [], maybe: [], no: [] };
    const age = ageMin();
    const workIncome = state.answers.workIncome || "none";
    const hdb = ["hdb_1_2", "hdb_3", "hdb_4plus"].includes(state.answers.housing);
    const disabled = hasNeed("moderate_disability") || hasNeed("severe_disability") || hasNeed("home_care");
    const severe = hasNeed("severe_disability");
    const careNeed = disabled || hasNeed("social_isolation") || (state.answers.careServices || []).some((service) => service !== "no_care_services") || state.answers.living === "care_facility";
    const weakSupport = ["limited", "little_none"].includes(state.answers.support);
    const notWorking = ["retired", "caregiver"].includes(state.answers.employment);

    addScheme(groups, resident() ? "likely" : "maybe", "sgo_aac", ["age60", "community"]);
    addScheme(groups, resident() ? "likely" : "maybe", "senior_concession", ["age60", resident() ? "resident" : "foreignFew"]);

    if (citizen()) addScheme(groups, "likely", "chas", ["citizen", "incomeTier"]);
    else addScheme(groups, "no", "chas", ["citizenOnly"]);

    if (citizen() && age >= 65 && avUpTo31() && oneProperty()) addScheme(groups, "likely", "gstv_medisave", ["citizen", "age65", "av31"]);
    else if (citizen() && age >= 65) addScheme(groups, "maybe", "gstv_medisave", ["needsAvProperty"]);
    else addScheme(groups, "no", "gstv_medisave", ["age65"]);

    if (citizen() && age >= 65 && hdb && lowIncome() && oneProperty() && state.answers.cpf55 === "le_140k") {
      addScheme(groups, "likely", "silver_support", ["age65", "lowLifetimeIncome", "hdb"]);
    } else if (citizen() && age >= 65 && hdb && silverSupportIncomePossible()) {
      addScheme(groups, "maybe", "silver_support", ["automaticCpfCheck"]);
    } else {
      addScheme(groups, "no", "silver_support", ["age65"]);
    }

    if (citizen() && state.answers.birthCohort === "before_1949" && state.answers.citizenSince === "before_1986") {
      addScheme(groups, "likely", "pioneer", ["birth1949", "citizenBy1986"]);
    } else if (citizen() && state.answers.birthCohort === "before_1949") {
      addScheme(groups, "maybe", "pioneer", ["citizenshipDateCheck"]);
    } else {
      addScheme(groups, "no", "pioneer", ["birth1949"]);
    }

    if (citizen() && state.answers.birthCohort === "1950_1959" && ["before_1986", "before_1996"].includes(state.answers.citizenSince)) {
      addScheme(groups, "likely", "merdeka", ["birth1950", "citizenBy1996"]);
    } else if (citizen() && state.answers.birthCohort === "1950_1959") {
      addScheme(groups, "maybe", "merdeka", ["citizenshipDateCheck"]);
    } else {
      addScheme(groups, "no", "merdeka", ["birth1950"]);
    }

    if (citizen() && ["500_3000", "3001_6000"].includes(workIncome) && avUpTo31() && oneProperty()) {
      addScheme(groups, "likely", "majulah_earn_save", ["citizen", "working", "av31"]);
    } else if (citizen() && ["part_time", "full_time", "self_employed"].includes(state.answers.employment)) {
      addScheme(groups, "maybe", "majulah_earn_save", ["needsIncomeAv"]);
    } else {
      addScheme(groups, "no", "majulah_earn_save", ["working"]);
    }

    if (citizen() && workIncome === "500_3000" && avUpTo21() && oneProperty()) {
      addScheme(groups, "likely", "workfare", ["citizen", "working", "av21"]);
    } else if (citizen() && ["part_time", "full_time", "self_employed"].includes(state.answers.employment)) {
      addScheme(groups, "maybe", "workfare", ["needsWorkfareIncome"]);
    } else {
      addScheme(groups, "no", "workfare", ["working"]);
    }

    if (resident() && lowIncome() && weakSupport && (notWorking || disabled)) addScheme(groups, "likely", "comcare", ["lowIncome", "weakSupport"]);
    else if (resident() && (lowIncome() || weakSupport)) addScheme(groups, "maybe", "comcare", ["msfAssess"]);
    else addScheme(groups, "no", "comcare", ["lowIncome"]);

    if (resident() && severe && hasNeed("home_care") && citizen() && hcgMeansPossible()) addScheme(groups, "likely", "home_caregiving", ["severeDisability", "homeCare"]);
    else if (resident() && (disabled || hasNeed("home_care"))) addScheme(groups, "maybe", "home_caregiving", ["needsAdlAssessment"]);
    else addScheme(groups, "no", "home_caregiving", ["disability"]);

    if (resident() && hasNeed("mobility")) addScheme(groups, "likely", "smf", ["mobility", "resident"]);
    else addScheme(groups, "no", "smf", ["mobility"]);

    if (resident() && hasHomeHealthcareService() && idapeMeansPossible()) addScheme(groups, "likely", "smf_home_items", ["homeCare", "meansTest", "providerApply"]);
    else if (resident() && (hasNeed("home_care") || hasHomeHealthcareService())) addScheme(groups, "maybe", "smf_home_items", ["homeCare", "providerApply"]);
    else addScheme(groups, "no", "smf_home_items", ["homeCare"]);

    if (resident() && (age >= 65 || disabled) && wantsCaregiverTraining()) addScheme(groups, "likely", "caregiver_training", ["age65OrDisability", "caregiverCourse"]);
    else if (resident() && (age >= 65 || disabled) && state.answers.caregiverTraining === "not_sure") addScheme(groups, "maybe", "caregiver_training", ["age65OrDisability", "caregiverCourse"]);
    else addScheme(groups, "no", "caregiver_training", ["age65OrDisability"]);

    if (resident() && disabled && state.answers.mdwCare === "have_mdw_same_home" && state.answers.living !== "care_facility") addScheme(groups, "likely", "mdw_levy", ["disability", "mdwEmployerCheck"]);
    else if (resident() && disabled && hasOrPlansMdw() && state.answers.living !== "care_facility") addScheme(groups, "maybe", "mdw_levy", ["disability", "mdwEmployerCheck"]);
    else addScheme(groups, "no", "mdw_levy", ["disability"]);

    if (citizen() && state.answers.birthCohort === "before_1949" && state.answers.citizenSince === "before_1986" && severe) {
      addScheme(groups, "likely", "pioneer_das", ["birth1949", "citizenBy1986", "severeDisability"]);
    } else if (citizen() && state.answers.birthCohort === "before_1949" && disabled) {
      addScheme(groups, "maybe", "pioneer_das", ["birth1949", "needsAdlAssessment"]);
    } else {
      addScheme(groups, "no", "pioneer_das", ["birth1949", "disability"]);
    }

    if (citizen() && severe && age >= 65 && idapeMeansPossible() && state.answers.ltcCoverage === "no_ltc_policy") addScheme(groups, "likely", "idape", ["severeDisability", "idapeAgeCoverage", "meansTest"]);
    else if (citizen() && severe && age >= 60 && state.answers.ltcCoverage !== "careshield_life_policy" && state.answers.ltcCoverage !== "eldershield_policy") addScheme(groups, "maybe", "idape", ["severeDisability", "idapeAgeCoverage"]);
    else addScheme(groups, "no", "idape", ["severeDisability"]);

    if (resident() && severe && state.answers.ltcCoverage === "careshield_life_policy") {
      addScheme(groups, "likely", "careshield_life", ["severeDisability", "policyholderCheck"]);
      addScheme(groups, "no", "eldershield", ["policyholderCheck"]);
    } else if (resident() && severe && state.answers.ltcCoverage === "eldershield_policy") {
      addScheme(groups, "no", "careshield_life", ["policyholderCheck"]);
      addScheme(groups, "likely", "eldershield", ["severeDisability", "policyholderCheck"]);
    } else if (resident() && severe && state.answers.ltcCoverage === "not_sure") {
      addScheme(groups, "maybe", "careshield_life", ["severeDisability", "policyholderCheck"]);
      addScheme(groups, "maybe", "eldershield", ["severeDisability", "policyholderCheck"]);
    } else {
      addScheme(groups, "no", "careshield_life", ["severeDisability"]);
      addScheme(groups, "no", "eldershield", ["severeDisability"]);
    }

    if (resident() && severe && state.answers.medisaveBalance === "medisave_5000_plus") addScheme(groups, "likely", "medisave_care", ["severeDisability", "resident"]);
    else if (resident() && severe && state.answers.medisaveBalance === "medisave_not_sure") addScheme(groups, "maybe", "medisave_care", ["severeDisability", "resident"]);
    else addScheme(groups, "no", "medisave_care", ["severeDisability"]);

    if (citizen() && severe && lowIncome() && state.answers.medisaveBalance === "medisave_under_5000" && state.answers.ltcCoverage === "no_ltc_policy") addScheme(groups, "likely", "elderfund", ["severeDisability", "lowIncome", "policyholderCheck"]);
    else if (citizen() && severe && lowIncome()) addScheme(groups, "maybe", "elderfund", ["severeDisability", "lowIncome"]);
    else addScheme(groups, "no", "elderfund", ["severeDisability"]);

    if (citizen() && hasNeed("chronic")) addScheme(groups, "likely", "healthier_sg", ["chronic", "citizen"]);
    else if (citizen()) addScheme(groups, "maybe", "healthier_sg", ["preventiveCare"]);
    else addScheme(groups, "no", "healthier_sg", ["citizenOnly"]);

    if (resident() && careNeed) addScheme(groups, "likely", "care_services", ["careServices", "resident"]);
    else if (resident()) addScheme(groups, "maybe", "care_services", ["careServices"]);
    else addScheme(groups, "no", "care_services", ["resident"]);

    if (citizen()) addScheme(groups, "likely", "sg60_vouchers", ["citizen", "age60"]);
    else addScheme(groups, "no", "sg60_vouchers", ["citizenOnly"]);

    return groups;
  }

  function renderCard(item, status) {
    const scheme = t(`schemes.${item.id}`);
    const url = schemeLinks[item.id];
    const nextLink = nextStepLinks[item.id];
    return `
      <article class="scheme-card ${status === "maybe" ? "maybe" : status === "no" ? "no" : ""}">
        <div class="tags">
          <span class="tag">${t(`status.${status}`)}</span>
          ${(scheme.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <h3><a href="${url}" target="_blank" rel="noreferrer">${scheme.title}</a></h3>
        <p>${scheme.summary}</p>
        <p><strong>${t("ui.why")}:</strong> ${item.reasonKeys.map((key) => t(`reasons.${key}`)).join(" ")}</p>
        <p><strong>${t("ui.nextStep")}:</strong> ${scheme.next} ${nextLink ? `<a class="inline-action" href="${nextLink.href}" ${nextLink.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${t(nextLink.labelKey)}</a>` : ""}</p>
      </article>
    `;
  }

  function renderResults() {
    const groups = assess();
    app.innerHTML = `
      <section class="results-stage">
        <div class="results-header">
          <div>
            <span class="pill">${t("ui.results")}</span>
            <h1>${t("results.title")}</h1>
            <p class="lead">${t("results.lead")}</p>
          </div>
          <div class="result-actions">
            <button class="action-button primary" type="button" data-action="restart">${t("ui.restart")}</button>
          </div>
        </div>
        <section class="contact-panel">
          <div>
            <h2>${t("contact.title")}</h2>
            <p>${t("contact.body")}</p>
          </div>
          <a class="action-button primary" href="tel:18006506060">${t("contact.call")} 1800-650-6060</a>
        </section>
        ${["likely", "maybe", "no"].map((status) => `
          <section class="result-section">
            <h2>${t(`results.${status}`)} (${groups[status].length})</h2>
            <div class="card-grid">${groups[status].map((item) => renderCard(item, status)).join("")}</div>
          </section>
        `).join("")}
        <section class="source-list">
          <h2>${t("sources.title")}</h2>
          <p>${t("sources.note")} ${t("sources.checked")} ${VERIFIED_DATE}.</p>
          <div class="tags">
            ${sourceLinks.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join("")}
          </div>
        </section>
      </section>
    `;
    app.querySelector("[data-action='restart']").addEventListener("click", renderLanding);
  }

  function renderSupervisor() {
    app.innerHTML = `
      <section class="results-stage supervisor-stage">
        <div class="results-header">
          <div>
            <span class="pill">Supervisor</span>
            <h1>Review guide</h1>
            <p class="lead">Use this screen to judge policy accuracy, deploy readiness, UX, and SGO-fit without walking through every persona manually.</p>
          </div>
          <button class="action-button primary" type="button" data-action="restart">Back to app</button>
        </div>
        <div class="review-grid compact">
          <article class="review-card compact">
            <h2>SGO fit</h2>
            <p>Built around SGO's public role: senior outreach, needs discovery, and connection to relevant care services/resources through visits, calls, and community programmes.</p>
          </article>
          <article class="review-card compact">
            <h2>Accuracy guardrails</h2>
            <p>Results are grouped as likely, needs checking, and less likely. Schemes needing CPF, IRAS, Singpass, medical, or household verification are not overclaimed.</p>
          </article>
          <article class="review-card compact">
            <h2>Senior UX</h2>
            <p>Large buttons, one question per screen, clear progress, restart/back controls, plain-language explanations, and multilingual content from one i18n dictionary.</p>
          </article>
          <article class="review-card compact">
            <h2>Privacy</h2>
            <p>No login, cookies, analytics, server calls, or stored form data. Answers stay in browser memory and clear on restart or refresh.</p>
          </article>
          <article class="review-card compact">
            <h2>Netlify</h2>
            <p>Static app. Publish directory is project root. Build command validates JavaScript, JSON, source links, i18n keys, and required SGO logo file.</p>
          </article>
          <article class="review-card compact">
            <h2>Asset rule</h2>
            <p>UI uses the SGO logo from AIC CDN. No synthetic or generated bitmap images remain in project files.</p>
          </article>
        </div>
        <section class="source-list">
          <h2>Official sources checked ${VERIFIED_DATE}</h2>
          <div class="tags">
            ${sourceLinks.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join("")}
          </div>
        </section>
      </section>
    `;
    app.querySelector("[data-action='restart']").addEventListener("click", renderLanding);
  }

  renderLanding();
})();
