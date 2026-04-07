import { useState, useMemo } from "react";

// ── Dummy Data ──────────────────────────────────────────────────────────────
const STORES = [
  { id: "ST01", name: "東京北千住店" },
  { id: "ST02", name: "長崎アミュプラザ店" },
  { id: "ST03", name: "岡崎アウトレット店" },
  { id: "ST04", name: "佐野アウトレット店" },
  { id: "ST05", name: "東京立川店" },
  { id: "ST06", name: "東京調布店" },
  { id: "ST07", name: "東京表参道店" },
  { id: "ST08", name: "東京新宿店" },
  { id: "ST09", name: "神奈川本厚木店" },
  { id: "ST10", name: "埼玉深谷アウトレット店" },
  { id: "ST11", name: "北海道札幌店" },
  { id: "ST12", name: "三重長島アウトレット店" },
  { id: "ST13", name: "京都コトチカ店" },
  { id: "ST14", name: "愛知サカエ店" },
];

const PRODUCTS = [
  { id: "317359", code: "317359", name: "ダークチョコレート 70% 100g", category: "板チョコレート", unit: "PCS" },
  { id: "372248", code: "372248", name: "プラリネアソート 28個入", category: "プラリネ", unit: "PCS" },
  { id: "429555", code: "429555", name: "ボールチョコ ティラミス 10kg", category: "ボールチョコ", unit: "PCS" },
  { id: "434319", code: "434319", name: "ミルクチョコスティック 38g×24本×8箱", category: "ボールチョコ", unit: "PCS" },
  { id: "439069", code: "439069", name: "オレンジアーモンドチョコ 100g", category: "板チョコレート", unit: "PCS" },
  { id: "439123", code: "439123", name: "ミルクヘーゼルナッツチョコ 150g", category: "タブレット", unit: "PCS" },
  { id: "439219", code: "439219", name: "ホワイトアーモンドチョコ 150g", category: "タブレット", unit: "PCS" },
  { id: "439517", code: "439517", name: "ミニプラリネ 44g", category: "プラリネ", unit: "PCS" },
  { id: "460072", code: "460072", name: "うさぎ型チョコ ミニ 5×10g", category: "季節限定", unit: "PCS" },
  { id: "471166", code: "471166", name: "くまの家チョコセット 153g", category: "ギフト", unit: "PCS" },
  { id: "477224", code: "477224", name: "ミルクチョコバー 120g", category: "ギフト", unit: "PCS" },
  { id: "477396", code: "477396", name: "ミルクボールチョコ 100g", category: "ボールチョコ", unit: "PCS" },
  { id: "478882", code: "478882", name: "アドベントカレンダー クリスマスナイト", category: "季節限定", unit: "PCS" },
  { id: "478889", code: "478889", name: "アドベントカレンダー ハウス型", category: "季節限定", unit: "PCS" },
  { id: "859491", code: "859491", name: "シャンパントリュフ 6kg", category: "業務用", unit: "PCS" },
  { id: "859635", code: "859635", name: "抹茶ボールチョコ 10kg", category: "業務用", unit: "PCS" },
  { id: "859773", code: "859773", name: "ミルク＆ホワイトボールチョコ 10kg", category: "業務用", unit: "PCS" },
  { id: "859849", code: "859849", name: "ダブルチョコボール 10kg", category: "業務用", unit: "PCS" },
  { id: "9701479", code: "9701479", name: "和柄コレクション 鶴 14粒入", category: "ギフト", unit: "PCS" },
  { id: "9701591", code: "9701591", name: "ペパーミントクッキーチョコ 3個入", category: "ボールチョコ", unit: "PCS" },
  { id: "9701608", code: "9701608", name: "シナモンスワールチョコ 3個入", category: "季節限定", unit: "PCS" },
  { id: "9701668", code: "9701668", name: "クレームチョコ ダーク", category: "生チョコ", unit: "PCS" },
  { id: "9701673", code: "9701673", name: "チョコサンドクッキー ダーク 70%", category: "焼き菓子", unit: "PCS" },
  { id: "9701674", code: "9701674", name: "チョコサンドクッキー ミルク", category: "焼き菓子", unit: "PCS" },
  { id: "9701675", code: "9701675", name: "チョコサンドクッキー フランボワーズ", category: "焼き菓子", unit: "PCS" },
  { id: "9701685", code: "9701685", name: "チョコウェイファー ファミリーパック 35個入", category: "ウェイファー", unit: "PCS" },
  { id: "9701702", code: "9701702", name: "フルーツチョコ オレンジ", category: "フルーツチョコ", unit: "PCS" },
  { id: "9701703", code: "9701703", name: "フルーツチョコ レモン＆ジンジャー", category: "フルーツチョコ", unit: "PCS" },
  { id: "9701704", code: "9701704", name: "フルーツチョコ ココナッツ", category: "フルーツチョコ", unit: "PCS" },
  { id: "9701711", code: "9701711", name: "和柄コレクション 鶴 6粒入", category: "ギフト", unit: "PCS" },
  { id: "9701720", code: "9701720", name: "クリアランスバッグ L3", category: "業務用", unit: "PCS" },
];

const BATCHES_INIT = [
  { id: "B001", productId: "317359", batchNo: "L4635", expiryDate: "2026-12-31", totalQty: 6140, reservedQty: 0 },
  { id: "B002", productId: "317359", batchNo: "L4755", expiryDate: "2026-09-30", totalQty: 362, reservedQty: 0 },
  { id: "B003", productId: "317359", batchNo: "L5855", expiryDate: "2026-07-31", totalQty: 3, reservedQty: 0 },
  { id: "B004", productId: "372248", batchNo: "L4645", expiryDate: "2026-02-28", totalQty: 192, reservedQty: 0 },
  { id: "B005", productId: "429555", batchNo: "L1545", expiryDate: "2026-11-30", totalQty: 756000, reservedQty: 0 },
  { id: "B006", productId: "429555", batchNo: "L4605", expiryDate: "2026-10-31", totalQty: 943200, reservedQty: 0 },
  { id: "B007", productId: "429555", batchNo: "L2545", expiryDate: "2026-11-30", totalQty: 387200, reservedQty: 0 },
  { id: "B008", productId: "429555", batchNo: "L2525", expiryDate: "2026-11-30", totalQty: 8800, reservedQty: 0 },
  { id: "B009", productId: "429555", batchNo: "L5705", expiryDate: "2026-07-31", totalQty: 41061, reservedQty: 0 },
  { id: "B010", productId: "429555", batchNo: "L5605", expiryDate: "2026-10-31", totalQty: 19200, reservedQty: 0 },
  { id: "B011", productId: "429555", batchNo: "L2905", expiryDate: "2026-03-31", totalQty: 248, reservedQty: 0 },
  { id: "B012", productId: "429555", batchNo: "L4735", expiryDate: "2026-07-31", totalQty: 397, reservedQty: 0 },
  { id: "B013", productId: "429555", batchNo: "L6805", expiryDate: "2026-05-31", totalQty: 162, reservedQty: 0 },
  { id: "B014", productId: "434319", batchNo: "L3665", expiryDate: "2026-08-31", totalQty: 7558, reservedQty: 0 },
  { id: "B015", productId: "434319", batchNo: "L4855", expiryDate: "2026-04-30", totalQty: 1, reservedQty: 0 },
  { id: "B016", productId: "434319", batchNo: "L1735", expiryDate: "2026-06-30", totalQty: 5, reservedQty: 0 },
  { id: "B017", productId: "434319", batchNo: "L5695", expiryDate: "2026-08-31", totalQty: 10, reservedQty: 0 },
  { id: "B018", productId: "439069", batchNo: "L4875", expiryDate: "2026-03-31", totalQty: 12, reservedQty: 0 },
  { id: "B019", productId: "439123", batchNo: "L3615", expiryDate: "2026-09-23", totalQty: 4028, reservedQty: 0 },
  { id: "B020", productId: "439123", batchNo: "L6815", expiryDate: "2026-05-09", totalQty: 1275, reservedQty: 0 },
  { id: "B021", productId: "439123", batchNo: "L6865", expiryDate: "2026-04-04", totalQty: 12, reservedQty: 0 },
  { id: "B022", productId: "439219", batchNo: "L3625", expiryDate: "2026-09-16", totalQty: 4313, reservedQty: 0 },
  { id: "B023", productId: "439219", batchNo: "L5775", expiryDate: "2026-06-05", totalQty: 255, reservedQty: 0 },
  { id: "B024", productId: "439219", batchNo: "L2885", expiryDate: "2026-03-17", totalQty: 11, reservedQty: 0 },
  { id: "B025", productId: "439517", batchNo: "L1585", expiryDate: "2026-10-31", totalQty: 12628, reservedQty: 0 },
  { id: "B026", productId: "439517", batchNo: "L1665", expiryDate: "2026-08-31", totalQty: 7, reservedQty: 0 },
  { id: "B027", productId: "439517", batchNo: "L2665", expiryDate: "2026-08-31", totalQty: 6, reservedQty: 0 },
  { id: "B028", productId: "460072", batchNo: "L1665", expiryDate: "2026-08-31", totalQty: 763, reservedQty: 0 },
  { id: "B029", productId: "460072", batchNo: "L2595", expiryDate: "2026-08-31", totalQty: 8731, reservedQty: 0 },
  { id: "B030", productId: "460072", batchNo: "L2675", expiryDate: "2026-08-31", totalQty: 3569, reservedQty: 0 },
  { id: "B031", productId: "460072", batchNo: "L3685", expiryDate: "2026-08-31", totalQty: 678, reservedQty: 0 },
  { id: "B032", productId: "460072", batchNo: "L4595", expiryDate: "2026-08-31", totalQty: 314, reservedQty: 0 },
  { id: "B033", productId: "460072", batchNo: "L1675", expiryDate: "2026-08-31", totalQty: 1638, reservedQty: 0 },
  { id: "B034", productId: "460072", batchNo: "L2665", expiryDate: "2026-08-31", totalQty: 1632, reservedQty: 0 },
  { id: "B035", productId: "460072", batchNo: "L2685", expiryDate: "2026-08-31", totalQty: 840, reservedQty: 0 },
  { id: "B036", productId: "460072", batchNo: "L2695", expiryDate: "2026-08-31", totalQty: 852, reservedQty: 0 },
  { id: "B037", productId: "460072", batchNo: "L3665", expiryDate: "2026-08-31", totalQty: 804, reservedQty: 0 },
  { id: "B038", productId: "460072", batchNo: "L3675", expiryDate: "2026-08-31", totalQty: 2719, reservedQty: 0 },
  { id: "B039", productId: "460072", batchNo: "L1655", expiryDate: "2026-08-31", totalQty: 3, reservedQty: 0 },
  { id: "B040", productId: "460072", batchNo: "L1685", expiryDate: "2026-08-31", totalQty: 4, reservedQty: 0 },
  { id: "B041", productId: "471166", batchNo: "L6655", expiryDate: "2026-03-31", totalQty: 4, reservedQty: 0 },
  { id: "B042", productId: "477224", batchNo: "L2685", expiryDate: "2026-03-31", totalQty: 189, reservedQty: 0 },
  { id: "B043", productId: "477396", batchNo: "L3805", expiryDate: "2026-04-30", totalQty: 83, reservedQty: 0 },
  { id: "B044", productId: "477396", batchNo: "L4805", expiryDate: "2026-04-30", totalQty: 141, reservedQty: 0 },
  { id: "B045", productId: "477396", batchNo: "L5805", expiryDate: "2026-04-30", totalQty: 28, reservedQty: 0 },
  { id: "B046", productId: "478882", batchNo: "L5785", expiryDate: "2026-03-31", totalQty: 6, reservedQty: 0 },
  { id: "B047", productId: "478882", batchNo: "L3785", expiryDate: "2026-03-31", totalQty: 7, reservedQty: 0 },
  { id: "B048", productId: "478889", batchNo: "L4765", expiryDate: "2026-03-31", totalQty: 14, reservedQty: 0 },
  { id: "B049", productId: "478889", batchNo: "L2765", expiryDate: "2026-03-31", totalQty: 6, reservedQty: 0 },
  { id: "B050", productId: "478889", batchNo: "L5775", expiryDate: "2026-03-31", totalQty: 5, reservedQty: 0 },
  { id: "B051", productId: "859491", batchNo: "L175500", expiryDate: "2026-06-30", totalQty: 14396, reservedQty: 0 },
  { id: "B052", productId: "859491", batchNo: "L471500", expiryDate: "2026-07-31", totalQty: 370569, reservedQty: 0 },
  { id: "B053", productId: "859491", batchNo: "L353500", expiryDate: "2026-11-30", totalQty: 779000, reservedQty: 0 },
  { id: "B054", productId: "859491", batchNo: "L179500", expiryDate: "2026-05-31", totalQty: 217, reservedQty: 0 },
  { id: "B055", productId: "859491", batchNo: "L480500", expiryDate: "2026-05-31", totalQty: 403, reservedQty: 0 },
  { id: "B056", productId: "859491", batchNo: "L357500", expiryDate: "2026-10-31", totalQty: 76000, reservedQty: 0 },
  { id: "B058", productId: "859635", batchNo: "L365500", expiryDate: "2026-08-31", totalQty: 1045600, reservedQty: 0 },
  { id: "B059", productId: "859635", batchNo: "L456500", expiryDate: "2026-10-31", totalQty: 384000, reservedQty: 0 },
  { id: "B060", productId: "859635", batchNo: "L473500", expiryDate: "2026-07-31", totalQty: 2400, reservedQty: 0 },
  { id: "B061", productId: "859635", batchNo: "L377500", expiryDate: "2026-06-30", totalQty: 303200, reservedQty: 0 },
  { id: "B062", productId: "859635", batchNo: "L152500", expiryDate: "2026-11-30", totalQty: 96000, reservedQty: 0 },
  { id: "B063", productId: "859773", batchNo: "L476500", expiryDate: "2026-06-30", totalQty: 22997, reservedQty: 0 },
  { id: "B064", productId: "859773", batchNo: "L268500", expiryDate: "2026-08-31", totalQty: 179892, reservedQty: 0 },
  { id: "B065", productId: "859773", batchNo: "L457500", expiryDate: "2026-10-31", totalQty: 190320, reservedQty: 0 },
  { id: "B066", productId: "859773", batchNo: "L363500", expiryDate: "2026-09-30", totalQty: 589199, reservedQty: 0 },
  { id: "B067", productId: "859773", batchNo: "L452500", expiryDate: "2026-11-30", totalQty: 342576, reservedQty: 0 },
  { id: "B068", productId: "859773", batchNo: "L388500", expiryDate: "2026-03-31", totalQty: 599, reservedQty: 0 },
  { id: "B069", productId: "859849", batchNo: "L576500", expiryDate: "2026-06-30", totalQty: 417600, reservedQty: 0 },
  { id: "B070", productId: "859849", batchNo: "L275500", expiryDate: "2026-06-30", totalQty: 116800, reservedQty: 0 },
  { id: "B071", productId: "859849", batchNo: "L572500", expiryDate: "2026-07-31", totalQty: 1600, reservedQty: 0 },
  { id: "B072", productId: "859849", batchNo: "L287500", expiryDate: "2026-03-31", totalQty: 792, reservedQty: 0 },
  { id: "B073", productId: "859849", batchNo: "L788500", expiryDate: "2026-03-31", totalQty: 666, reservedQty: 0 },
  { id: "B074", productId: "9701479", batchNo: "L2555", expiryDate: "2026-05-31", totalQty: 1790, reservedQty: 0 },
  { id: "B075", productId: "9701479", batchNo: "L2986", expiryDate: "2026-06-30", totalQty: 600, reservedQty: 0 },
  { id: "B076", productId: "9701479", batchNo: "L4525", expiryDate: "2026-05-31", totalQty: 300, reservedQty: 0 },
  { id: "B077", productId: "9701591", batchNo: "L1645", expiryDate: "2026-03-31", totalQty: 9, reservedQty: 0 },
  { id: "B078", productId: "9701608", batchNo: "L1645", expiryDate: "2026-03-31", totalQty: 8, reservedQty: 0 },
  { id: "B079", productId: "9701668", batchNo: "20260602", expiryDate: "2026-06-02", totalQty: 16800, reservedQty: 0 },
  { id: "B080", productId: "9701668", batchNo: "20260624", expiryDate: "2026-06-24", totalQty: 3244, reservedQty: 0 },
  { id: "B081", productId: "9701673", batchNo: "20260511", expiryDate: "2026-05-11", totalQty: 5, reservedQty: 0 },
  { id: "B082", productId: "9701673", batchNo: "20260225", expiryDate: "2026-02-25", totalQty: 8, reservedQty: 0 },
  { id: "B083", productId: "9701673", batchNo: "20260309", expiryDate: "2026-03-09", totalQty: 17, reservedQty: 0 },
  { id: "B084", productId: "9701673", batchNo: "20260414", expiryDate: "2026-04-14", totalQty: 13, reservedQty: 0 },
  { id: "B085", productId: "9701673", batchNo: "20260427", expiryDate: "2026-04-27", totalQty: 1, reservedQty: 0 },
  { id: "B086", productId: "9701674", batchNo: "20260513", expiryDate: "2026-05-13", totalQty: 56, reservedQty: 0 },
  { id: "B087", productId: "9701674", batchNo: "20260429", expiryDate: "2026-04-29", totalQty: 14, reservedQty: 0 },
  { id: "B088", productId: "9701674", batchNo: "20260504", expiryDate: "2026-05-04", totalQty: 4, reservedQty: 0 },
  { id: "B089", productId: "9701674", batchNo: "20260201", expiryDate: "2026-02-01", totalQty: 8, reservedQty: 0 },
  { id: "B090", productId: "9701674", batchNo: "20260219", expiryDate: "2026-02-19", totalQty: 9, reservedQty: 0 },
  { id: "B091", productId: "9701674", batchNo: "20260301", expiryDate: "2026-03-01", totalQty: 14, reservedQty: 0 },
  { id: "B092", productId: "9701674", batchNo: "20260311", expiryDate: "2026-03-11", totalQty: 10, reservedQty: 0 },
  { id: "B093", productId: "9701674", batchNo: "20260325", expiryDate: "2026-03-25", totalQty: 8, reservedQty: 0 },
  { id: "B094", productId: "9701674", batchNo: "20260408", expiryDate: "2026-04-08", totalQty: 5, reservedQty: 0 },
  { id: "B095", productId: "9701674", batchNo: "20260413", expiryDate: "2026-04-13", totalQty: 6, reservedQty: 0 },
  { id: "B096", productId: "9701675", batchNo: "20260512", expiryDate: "2026-05-12", totalQty: 142, reservedQty: 0 },
  { id: "B097", productId: "9701675", batchNo: "20260506", expiryDate: "2026-05-06", totalQty: 16, reservedQty: 0 },
  { id: "B098", productId: "9701675", batchNo: "20260428", expiryDate: "2026-04-28", totalQty: 2, reservedQty: 0 },
  { id: "B099", productId: "9701675", batchNo: "20260224", expiryDate: "2026-02-24", totalQty: 10, reservedQty: 0 },
  { id: "B100", productId: "9701675", batchNo: "20260304", expiryDate: "2026-03-04", totalQty: 14, reservedQty: 0 },
  { id: "B101", productId: "9701675", batchNo: "20260310", expiryDate: "2026-03-10", totalQty: 17, reservedQty: 0 },
  { id: "B102", productId: "9701675", batchNo: "20260407", expiryDate: "2026-04-07", totalQty: 6, reservedQty: 0 },
  { id: "B103", productId: "9701675", batchNo: "20260415", expiryDate: "2026-04-15", totalQty: 4, reservedQty: 0 },
  { id: "B104", productId: "9701685", batchNo: "L5605", expiryDate: "2026-03-31", totalQty: 2304, reservedQty: 0 },
  { id: "B105", productId: "9701685", batchNo: "L2986", expiryDate: "2026-06-30", totalQty: 2160, reservedQty: 0 },
  { id: "B106", productId: "9701685", batchNo: "L4946", expiryDate: "2026-07-31", totalQty: 500, reservedQty: 0 },
  { id: "B107", productId: "9701702", batchNo: "L3976", expiryDate: "2026-05-31", totalQty: 8136, reservedQty: 0 },
  { id: "B108", productId: "9701702", batchNo: "L3635", expiryDate: "2026-03-31", totalQty: 3992, reservedQty: 0 },
  { id: "B109", productId: "9701703", batchNo: "L3785", expiryDate: "2026-02-28", totalQty: 9, reservedQty: 0 },
  { id: "B110", productId: "9701704", batchNo: "L3785", expiryDate: "2026-03-31", totalQty: 72, reservedQty: 0 },
  { id: "B111", productId: "9701711", batchNo: "L2555", expiryDate: "2026-05-31", totalQty: 3225, reservedQty: 0 },
  { id: "B112", productId: "9701711", batchNo: "L4525", expiryDate: "2026-05-31", totalQty: 6400, reservedQty: 0 },
  { id: "B113", productId: "9701720", batchNo: "L5505", expiryDate: "2026-02-28", totalQty: 3, reservedQty: 0 },
];

const RESERVATIONS_INIT = [
  { id: "R001", storeId: "ST01", batchId: "B001", productId: "317359", qty: 120,  note: "",             reservedAt: "2026-02-20 09:15", status: "shipped",  deliveryDate: "2026-02-24" },
  { id: "R002", storeId: "ST01", batchId: "B025", productId: "439517", qty: 300,  note: "バレンタイン販促用", reservedAt: "2026-02-21 14:30", status: "allocated", deliveryDate: "2026-02-28" },
  { id: "R003", storeId: "ST07", batchId: "B001", productId: "317359", qty: 240,  note: "",             reservedAt: "2026-02-22 10:00", status: "confirmed", deliveryDate: null },
  { id: "R004", storeId: "ST11", batchId: "B058", productId: "859635", qty: 5000, note: "",             reservedAt: "2026-02-23 11:45", status: "cancelled", deliveryDate: null },
  { id: "R005", storeId: "ST07", batchId: "B029", productId: "460072", qty: 400,  note: "イースター陳列用",  reservedAt: "2026-02-24 16:00", status: "confirmed", deliveryDate: null },
  { id: "R006", storeId: "ST01", batchId: "B058", productId: "859635", qty: 2000, note: "欠品補充",       reservedAt: "2026-02-24 11:00", status: "allocated", deliveryDate: "2026-03-01" },
  { id: "R007", storeId: "ST01", batchId: "B022", productId: "439219", qty: 50,   note: "",             reservedAt: "2026-02-25 08:30", status: "confirmed", deliveryDate: null },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const getBatch = (id, batches) => batches.find((b) => b.id === id);
const getStore = (id) => STORES.find((s) => s.id === id);
const availableQty = (b) => b.totalQty - b.reservedQty;

const expiryColor = (date) => {
  const days = Math.ceil((new Date(date) - new Date()) / 86400000);
  if (days <= 7) return "#ef4444";
  if (days <= 14) return "#f59e0b";
  return "#10b981";
};

const statusBadge = (status) => {
  const map = {
    confirmed:  { label: "予約確定",   color: "#4a7c59" },
    allocated:  { label: "引き当て済", color: "#8b6f5e" },
    shipped:    { label: "出荷済み",   color: "#2563eb" },
    cancelled:  { label: "キャンセル", color: "#9c8478" },
  };
  return map[status] || { label: status, color: "#9c8478" };
};

// ── Styles ───────────────────────────────────────────────────────────────────
// Palette: white/light-brown
// --bg:       #faf7f4  (warm off-white)
// --surface:  #ffffff
// --border:   #e8ddd4
// --brown1:   #8b6f5e  (medium brown — accents)
// --brown2:   #c4a882  (light tan — secondary)
// --brown3:   #f0e8df  (very light — hover/alt rows)
// --text:     #3d2b1f
// --muted:    #9c8478
// --green:    #4a7c59
// --red:      #c0392b
// --amber:    #c47c2b
const css = {
  app: { fontFamily: "'BIZ UDPGothic', 'Noto Sans JP', sans-serif", background: "#faf7f4", minHeight: "100vh", color: "#3d2b1f" },
  header: { background: "linear-gradient(135deg, #5c3d2e 0%, #3d2b1f 100%)", borderBottom: "1px solid #7a5442", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, boxShadow: "0 2px 8px #3d2b1f22" },
  logo: { fontSize: 18, fontWeight: 700, color: "#e8c99a", letterSpacing: "0.05em" },
  logoSub: { fontSize: 11, color: "#9c7c64", marginTop: 2 },
  nav: { display: "flex", gap: 4 },
  navBtn: (active) => ({ background: active ? "#c4a882" : "transparent", color: active ? "#3d2b1f" : "#c4a882", border: active ? "none" : "1px solid #7a5442", padding: "7px 20px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400, transition: "all 0.2s" }),
  storeChip: { background: "#f0e8df", border: "1px solid #e8ddd4", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "#8b6f5e" },
  content: { padding: 32, maxWidth: 1400, margin: "0 auto" },
  card: { background: "#ffffff", border: "1px solid #e8ddd4", borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: "0 1px 4px #3d2b1f0a" },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#3d2b1f", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: { padding: "10px 12px", textAlign: "left", color: "#9c8478", fontWeight: 700, borderBottom: "2px solid #e8ddd4", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "#faf7f4" },
  td: { padding: "12px 12px", borderBottom: "1px solid #f0e8df", verticalAlign: "middle" },
  btn: (variant = "primary") => {
    const v = {
      primary: { bg: "#8b6f5e", text: "#fff", border: "none" },
      danger:  { bg: "#c0392b", text: "#fff", border: "none" },
      ghost:   { bg: "transparent", text: "#8b6f5e", border: "1px solid #c4a882" },
    };
    return { background: v[variant].bg, color: v[variant].text, border: v[variant].border, padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s" };
  },
  input: { background: "#faf7f4", border: "1px solid #d6c9be", borderRadius: 6, padding: "8px 12px", color: "#3d2b1f", fontSize: 13, outline: "none", width: "100%" },
  select: { background: "#faf7f4", border: "1px solid #d6c9be", borderRadius: 6, padding: "8px 12px", color: "#3d2b1f", fontSize: 13, outline: "none", width: "100%" },
  badge: (color) => ({ background: color + "18", color: color, border: `1px solid ${color}44`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600, display: "inline-block" }),
  filterRow: { display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" },
  filterLabel: { fontSize: 11, color: "#9c8478", marginBottom: 4, fontWeight: 600, letterSpacing: "0.05em" },
  modal: { position: "fixed", inset: 0, background: "#3d2b1f55", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modalBox: { background: "#ffffff", border: "1px solid #e8ddd4", borderRadius: 16, padding: 32, width: 480, maxWidth: "90vw", boxShadow: "0 20px 60px #3d2b1f22" },
  stat: { background: "#faf7f4", border: "1px solid #e8ddd4", borderRadius: 10, padding: "16px 20px", flex: 1, minWidth: 160 },
  statVal: { fontSize: 28, fontWeight: 700, color: "#8b6f5e", lineHeight: 1.2 },
  statLabel: { fontSize: 11, color: "#9c8478", marginTop: 4 },
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("inventory");
  const [currentStore, setCurrentStore] = useState("ST01");
  const [isAdmin, setIsAdmin] = useState(false);
  const [batches, setBatches] = useState(BATCHES_INIT);
  const [reservations, setReservations] = useState(RESERVATIONS_INIT);
  const [modal, setModal] = useState(null); // { batch, product }
  const [reserveQty, setReserveQty] = useState(1);
  const [reserveNote, setReserveNote] = useState("");
  const [toast, setToast] = useState(null);

  // Filters
  const [fProduct, setFProduct] = useState("");        // product ID
  const [fProductText, setFProductText] = useState(""); // search text
  const [fProductOpen, setFProductOpen] = useState(false);
  const [fDaysMin, setFDaysMin] = useState("");
  const [fDaysMax, setFDaysMax] = useState("");
  const [fOnlyAvail, setFOnlyAvail] = useState(true);

  const productSuggestions = useMemo(() => {
    if (!fProductText) return PRODUCTS;
    const q = fProductText.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q)
    );
  }, [fProductText]);

  const showToast = (msg, color = "#10b981") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const remainingDays = (date) => Math.ceil((new Date(date) - new Date()) / 86400000);

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      if (fProduct && b.productId !== fProduct) return false;
      const days = remainingDays(b.expiryDate);
      if (fDaysMin !== "" && days < parseInt(fDaysMin)) return false;
      if (fDaysMax !== "" && days > parseInt(fDaysMax)) return false;
      if (fOnlyAvail && availableQty(b) <= 0) return false;
      return true;
    });
  }, [batches, fProduct, fDaysMin, fDaysMax, fOnlyAvail]);

  const myReservations = reservations.filter((r) => r.storeId === currentStore);

  const handleReserve = () => {
    if (!modal) return;
    const qty = parseInt(reserveQty);
    if (isNaN(qty) || qty <= 0) { showToast("数量を正しく入力してください", "#ef4444"); return; }
    if (qty > availableQty(modal.batch)) { showToast("在庫が不足しています", "#ef4444"); return; }

    const newRes = {
      id: "R" + String(reservations.length + 1).padStart(3, "0"),
      storeId: currentStore,
      batchId: modal.batch.id,
      productId: modal.batch.productId,
      qty,
      note: reserveNote.trim(),
      reservedAt: new Date().toLocaleString("ja-JP").replace(/\//g, "-").slice(0, 16),
      status: "confirmed",
      deliveryDate: null,
    };
    setReservations([...reservations, newRes]);
    setBatches(batches.map((b) => b.id === modal.batch.id ? { ...b, reservedQty: b.reservedQty + qty } : b));
    setModal(null);
    setReserveNote("");
    showToast(`✓ 予約が確定しました（${qty}${getProduct(modal.batch.productId).unit}）`);
  };

  const handleCancel = (resId) => {
    const res = reservations.find((r) => r.id === resId);
    if (!res) return;
    setReservations(reservations.map((r) => r.id === resId ? { ...r, status: "cancelled" } : r));
    setBatches(batches.map((b) => b.id === res.batchId ? { ...b, reservedQty: b.reservedQty - res.qty } : b));
    showToast("予約をキャンセルしました", "#f59e0b");
  };

  // Admin filters & sort
  const [aFStore, setAFStore] = useState("");
  const [aFProduct, setAFProduct] = useState("");
  const [aFBatch, setAFBatch] = useState("");
  const [aFStatus, setAFStatus] = useState("");
  const [aSort, setASort] = useState({ key: "reservedAt", dir: "desc" });

  const toggleSort = (key) => {
    setASort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  };
  const sortIcon = (key) => aSort.key === key ? (aSort.dir === "asc" ? " ▲" : " ▼") : " ⇅";

  const filteredAdminReservations = useMemo(() => {
    let list = reservations.filter(r => {
      if (aFStore && r.storeId !== aFStore) return false;
      if (aFProduct && r.productId !== aFProduct) return false;
      if (aFBatch && !getBatch(r.batchId, batches)?.batchNo.toLowerCase().includes(aFBatch.toLowerCase())) return false;
      if (aFStatus && r.status !== aFStatus) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      let va, vb;
      if (aSort.key === "reservedAt") { va = a.reservedAt; vb = b.reservedAt; }
      else if (aSort.key === "qty") { va = a.qty; vb = b.qty; }
      else if (aSort.key === "store") { va = getStore(a.storeId)?.name; vb = getStore(b.storeId)?.name; }
      else if (aSort.key === "product") { va = getProduct(a.productId)?.name; vb = getProduct(b.productId)?.name; }
      else if (aSort.key === "expiry") { va = getBatch(a.batchId, batches)?.expiryDate; vb = getBatch(b.batchId, batches)?.expiryDate; }
      else if (aSort.key === "status") { va = a.status; vb = b.status; }
      else if (aSort.key === "deliveryDate") { va = a.deliveryDate ?? ""; vb = b.deliveryDate ?? ""; }
      if (va < vb) return aSort.dir === "asc" ? -1 : 1;
      if (va > vb) return aSort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [reservations, batches, aFStore, aFProduct, aFBatch, aFStatus, aSort]);

  // Admin stats
  const totalReserved = reservations.filter(r => r.status === "confirmed").length;
  const totalCancelled = reservations.filter(r => r.status === "cancelled").length;
  const totalBatches = batches.length;
  const lowStockBatches = batches.filter(b => availableQty(b) / b.totalQty < 0.2).length;

  return (
    <div style={css.app}>
      {/* Header */}
      <div style={css.header}>
        <div>
          <div style={css.logo}>📦 WMS 在庫予約システム</div>
          <div style={css.logoSub}>Inventory Reservation Portal — Mock v1.0</div>
        </div>
        <div style={css.nav}>
          {!isAdmin && (
            <>
              <button style={css.navBtn(tab === "inventory")} onClick={() => setTab("inventory")}>在庫一覧</button>
              <button style={css.navBtn(tab === "myreservations")} onClick={() => setTab("myreservations")}>予約履歴</button>
            </>
          )}
          {isAdmin && (
            <button style={css.navBtn(tab === "admin")} onClick={() => setTab("admin")}>管理ダッシュボード</button>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {!isAdmin && (
            <select style={{ ...css.select, width: 160, background: "#5c3d2e", color: "#e8c99a", border: "1px solid #7a5442" }} value={currentStore} onChange={e => setCurrentStore(e.target.value)}>
              {STORES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          )}
          <button style={{ ...css.btn(isAdmin ? "danger" : "primary"), padding: "7px 14px" }} onClick={() => { setIsAdmin(!isAdmin); setTab(isAdmin ? "inventory" : "admin"); }}>
            {isAdmin ? "👤 店舗に切替" : "🔧 管理者モード"}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 80, right: 32, background: toast.color, color: "#fff", padding: "12px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13, zIndex: 200, boxShadow: "0 4px 20px #0006", transition: "all 0.3s" }}>
          {toast.msg}
        </div>
      )}

      <div style={css.content}>

        {/* ── 在庫一覧 ── */}
        {tab === "inventory" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#3d2b1f" }}>在庫一覧</div>
              <div style={{ fontSize: 13, color: "#9c8478", marginTop: 4 }}>未引き当て在庫からバッチを選択して予約できます</div>
            </div>

            {/* Filters */}
            <div style={css.card}>
              <div style={css.cardTitle}>🔍 絞り込み条件</div>
              <div style={css.filterRow}>
                {/* 1行目：商品検索（全幅） */}
                <div style={{ width: "100%", position: "relative" }}>
                  <div style={css.filterLabel}>商品名・コード・カテゴリ検索</div>
                  <div style={{ position: "relative" }}>
                    <input
                      style={{ ...css.input, paddingRight: 32 }}
                      placeholder="商品名・コード・カテゴリ..."
                      value={fProductText}
                      onChange={e => { setFProductText(e.target.value); setFProduct(""); setFProductOpen(true); }}
                      onFocus={() => setFProductOpen(true)}
                      onBlur={() => setTimeout(() => setFProductOpen(false), 150)}
                    />
                    {(fProduct || fProductText) && (
                      <span
                        onClick={() => { setFProduct(""); setFProductText(""); setFProductOpen(false); }}
                        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9c8478", fontSize: 14, lineHeight: 1 }}
                      >✕</span>
                    )}
                  </div>
                  {fProductOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#ffffff", border: "1px solid #e8ddd4", borderRadius: 8, zIndex: 50, marginTop: 4, overflow: "hidden", boxShadow: "0 8px 24px #3d2b1f18" }}>
                      <div
                        style={{ padding: "10px 14px", cursor: "pointer", color: "#9c8478", fontSize: 13, borderBottom: "1px solid #f0e8df" }}
                        onMouseDown={() => { setFProduct(""); setFProductText(""); setFProductOpen(false); }}
                      >
                        すべての商品
                      </div>
                      {productSuggestions.length === 0 && (
                        <div style={{ padding: "10px 14px", color: "#9c8478", fontSize: 13 }}>該当する商品がありません</div>
                      )}
                      {productSuggestions.map(p => {
                        const isSelected = fProduct === p.id;
                        const q = fProductText.toLowerCase();
                        const highlight = (text) => {
                          if (!q) return <span>{text}</span>;
                          const idx = text.toLowerCase().indexOf(q);
                          if (idx === -1) return <span>{text}</span>;
                          return <span>{text.slice(0, idx)}<mark style={{ background: "#c4a882", color: "#3d2b1f", borderRadius: 2, padding: "0 1px" }}>{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</span>;
                        };
                        return (
                          <div
                            key={p.id}
                            style={{ padding: "9px 14px", cursor: "pointer", background: isSelected ? "#f0e8df" : "transparent", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0e8df" }}
                            onMouseDown={() => { setFProduct(p.id); setFProductText(p.name); setFProductOpen(false); }}
                            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#faf7f4"; }}
                            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                          >
                            <div>
                              <div style={{ color: "#3d2b1f", fontSize: 13 }}>{highlight(p.name)}</div>
                              <div style={{ color: "#9c8478", fontSize: 11, marginTop: 2 }}>
                                <code style={{ color: "#c47c2b" }}>{highlight(p.code)}</code>
                                <span style={{ marginLeft: 8 }}>{p.category}</span>
                              </div>
                            </div>
                            <span style={{ ...css.badge("#8b6f5e"), fontSize: 10, marginLeft: 8, flexShrink: 0 }}>{p.category}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              {/* 2行目：残存日数・在庫ありのみ・クリア */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 160px" }}>
                  <div style={css.filterLabel}>残存日数（最小）</div>
                  <input style={css.input} type="number" min={0} placeholder="例: 7" value={fDaysMin} onChange={e => setFDaysMin(e.target.value)} />
                </div>
                <div style={{ flex: "0 0 160px" }}>
                  <div style={css.filterLabel}>残存日数（最大）</div>
                  <input style={css.input} type="number" min={0} placeholder="例: 365" value={fDaysMax} onChange={e => setFDaysMax(e.target.value)} />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#8b6f5e", cursor: "pointer", paddingBottom: 2 }}>
                  <input type="checkbox" checked={fOnlyAvail} onChange={e => setFOnlyAvail(e.target.checked)} style={{ accentColor: "#8b6f5e" }} />
                  在庫ありのみ
                </label>
                <button style={{ ...css.btn("ghost") }} onClick={() => { setFProduct(""); setFProductText(""); setFDaysMin(""); setFDaysMax(""); setFOnlyAvail(true); }}>クリア</button>
              </div>
            </div>

            {/* Batch Table */}
            <div style={css.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={css.cardTitle}>📋 バッチ一覧（{filteredBatches.length}件）</div>
              </div>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>商品名</th>
                    <th style={css.th}>バッチNo.</th>
                    <th style={css.th}>賞味期限</th>
                    <th style={css.th}>総数</th>
                    <th style={css.th}>自店予約済</th>
                    <th style={css.th}>残数</th>
                    <th style={css.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.map((b) => {
                    const p = getProduct(b.productId);
                    const avail = availableQty(b);
                    const ec = expiryColor(b.expiryDate);
                    const myRes = reservations.find(r => r.batchId === b.id && r.storeId === currentStore && r.status === "confirmed");
                    const myQty = myRes ? myRes.qty : 0;
                    const rowBg = myRes ? "#f0f7f2" : "";
                    return (
                      <tr key={b.id}
                        style={{ transition: "background 0.15s", background: rowBg }}
                        onMouseEnter={e => e.currentTarget.style.background = myRes ? "#e4f0e8" : "#faf7f4"}
                        onMouseLeave={e => e.currentTarget.style.background = rowBg}
                      >
                        <td style={css.td}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontWeight: 600, color: "#3d2b1f" }}>{p.name}</span>
                            {myRes && <span style={{ ...css.badge("#4a7c59"), fontSize: 10 }}>✓ 予約済</span>}
                          </div>
                          <div style={{ fontSize: 11, color: "#9c8478", marginTop: 2 }}>
                            <code style={{ color: "#c47c2b" }}>{p.code}</code>
                            <span style={{ marginLeft: 6 }}>{p.category}</span>
                          </div>
                        </td>
                        <td style={css.td}><code style={{ fontSize: 12, color: "#9c8478" }}>{b.batchNo}</code></td>
                        <td style={css.td}>
                          <span style={css.badge(ec)}>{b.expiryDate}</span>
                          <div style={{ fontSize: 11, color: ec, marginTop: 3 }}>残{Math.ceil((new Date(b.expiryDate) - new Date()) / 86400000)}日</div>
                        </td>
                        <td style={css.td}><span style={{ color: "#3d2b1f" }}>{b.totalQty.toLocaleString()}</span></td>
                        <td style={css.td}>
                          {myQty > 0
                            ? <span style={{ fontWeight: 700, color: "#4a7c59" }}>{myQty.toLocaleString()}</span>
                            : <span style={{ color: "#c4a882" }}>—</span>
                          }
                        </td>
                        <td style={css.td}><span style={{ fontWeight: 700, color: avail > 0 ? "#4a7c59" : "#c0392b" }}>{avail.toLocaleString()}</span></td>
                        <td style={css.td}>
                          {myRes ? (
                            <button
                              style={{ ...css.btn("ghost") }}
                              onClick={() => { setTab("myreservations"); }}
                            >
                              📋 予約確認
                            </button>
                          ) : (
                            <button
                              style={{ ...css.btn(avail > 0 ? "primary" : "ghost"), opacity: avail > 0 ? 1 : 0.4 }}
                              disabled={avail <= 0}
                              onClick={() => { setModal({ batch: b, product: p }); setReserveQty(1); }}
                            >
                              予約する
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredBatches.length === 0 && (
                    <tr><td colSpan={7} style={{ ...css.td, textAlign: "center", color: "#9c8478", padding: 40 }}>該当する在庫が見つかりません</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 予約履歴 ── */}
        {tab === "myreservations" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#3d2b1f" }}>予約履歴</div>
              <div style={{ fontSize: 13, color: "#9c8478", marginTop: 4 }}>{getStore(currentStore)?.name} の予約一覧</div>
            </div>
            <div style={css.card}>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>予約ID</th>
                    <th style={css.th}>商品名</th>
                    <th style={css.th}>バッチNo.</th>
                    <th style={css.th}>賞味期限</th>
                    <th style={css.th}>数量</th>
                    <th style={css.th}>備考</th>
                    <th style={css.th}>予約日時</th>
                    <th style={css.th}>ステータス</th>
                    <th style={css.th}>納品予定日</th>
                    <th style={css.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {myReservations.map((r) => {
                    const p = getProduct(r.productId);
                    const b = getBatch(r.batchId, batches);
                    const s = statusBadge(r.status);
                    const canCancel = r.status === "confirmed";
                    const rowBg = r.status === "shipped" ? "#f0f4ff" : r.status === "allocated" ? "#fdf5ef" : "";
                    return (
                      <tr key={r.id} style={{ background: rowBg }}>
                        <td style={css.td}><code style={{ fontSize: 12, color: "#9c8478" }}>{r.id}</code></td>
                        <td style={css.td}><span style={{ fontWeight: 600, color: "#3d2b1f" }}>{p?.name}</span></td>
                        <td style={css.td}><code style={{ fontSize: 12, color: "#9c8478" }}>{b?.batchNo}</code></td>
                        <td style={css.td}>{b && <span style={css.badge(expiryColor(b.expiryDate))}>{b.expiryDate}</span>}</td>
                        <td style={css.td}>{r.qty.toLocaleString()}{p?.unit}</td>
                        <td style={css.td}>
                          {r.note
                            ? <span style={{ fontSize: 12, color: "#3d2b1f" }}>{r.note}</span>
                            : <span style={{ color: "#c4a882" }}>—</span>
                          }
                        </td>
                        <td style={css.td}><span style={{ fontSize: 12, color: "#9c8478" }}>{r.reservedAt}</span></td>
                        <td style={css.td}><span style={css.badge(s.color)}>{s.label}</span></td>
                        <td style={css.td}>
                          {r.deliveryDate
                            ? <span style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>{r.deliveryDate}</span>
                            : <span style={{ color: "#c4a882" }}>—</span>
                          }
                        </td>
                        <td style={css.td}>
                          {canCancel && (
                            <button style={css.btn("danger")} onClick={() => handleCancel(r.id)}>キャンセル</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {myReservations.length === 0 && (
                    <tr><td colSpan={10} style={{ ...css.td, textAlign: "center", color: "#9c8478", padding: 40 }}>予約がありません</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 管理者ダッシュボード ── */}
        {tab === "admin" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#3d2b1f" }}>管理者ダッシュボード</div>
              <div style={{ fontSize: 13, color: "#9c8478", marginTop: 4 }}>全店舗の予約状況・在庫サマリー</div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { label: "確定予約数", val: totalReserved, icon: "✅", color: "#4a7c59" },
                { label: "キャンセル数", val: totalCancelled, icon: "❌", color: "#9c8478" },
                { label: "管理バッチ数", val: totalBatches, icon: "📦", color: "#8b6f5e" },
                { label: "残少バッチ", val: lowStockBatches, icon: "⚠️", color: "#c47c2b" },
              ].map((s) => (
                <div key={s.label} style={css.stat}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ ...css.statVal, color: s.color }}>{s.val}</div>
                  <div style={css.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* All reservations */}
            <div style={css.card}>
              {/* Filters */}
              <div style={{ ...css.filterRow, marginBottom: 16 }}>
                <div style={{ flex: 1.5, minWidth: 150 }}>
                  <div style={css.filterLabel}>店舗</div>
                  <select style={css.select} value={aFStore} onChange={e => setAFStore(e.target.value)}>
                    <option value="">すべての店舗</option>
                    {STORES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div style={{ flex: 2, minWidth: 180 }}>
                  <div style={css.filterLabel}>商品</div>
                  <select style={css.select} value={aFProduct} onChange={e => setAFProduct(e.target.value)}>
                    <option value="">すべての商品</option>
                    {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1.5, minWidth: 150 }}>
                  <div style={css.filterLabel}>バッチNo.</div>
                  <input style={css.input} placeholder="LOT-..." value={aFBatch} onChange={e => setAFBatch(e.target.value)} />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div style={css.filterLabel}>ステータス</div>
                  <select style={css.select} value={aFStatus} onChange={e => setAFStatus(e.target.value)}>
                    <option value="">すべて</option>
                    <option value="confirmed">予約確定</option>
                    <option value="allocated">引き当て済</option>
                    <option value="shipped">出荷済み</option>
                    <option value="cancelled">キャンセル</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button style={{ ...css.btn("ghost") }} onClick={() => { setAFStore(""); setAFProduct(""); setAFBatch(""); setAFStatus(""); }}>クリア</button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={css.cardTitle}>📋 全店舗 予約一覧（{filteredAdminReservations.length} / {reservations.length}件）</div>
                <div style={{ fontSize: 11, color: "#9c8478" }}>列ヘッダーをクリックしてソート</div>
              </div>

              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>予約ID</th>
                    {[
                      { key: "store", label: "店舗" },
                      { key: "product", label: "商品名" },
                      { key: null, label: "バッチNo." },
                      { key: "expiry", label: "賞味期限" },
                      { key: "qty", label: "数量" },
                      { key: "reservedAt", label: "予約日時" },
                      { key: "status", label: "ステータス" },
                      { key: "deliveryDate", label: "納品予定日" },
                    ].map(({ key, label }) => (
                      <th key={label} style={{ ...css.th, cursor: key ? "pointer" : "default", userSelect: "none", color: aSort.key === key ? "#8b6f5e" : "#9c8478" }}
                        onClick={() => key && toggleSort(key)}>
                        {label}{key ? sortIcon(key) : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAdminReservations.map((r) => {
                    const p = getProduct(r.productId);
                    const b = getBatch(r.batchId, batches);
                    const store = getStore(r.storeId);
                    const s = statusBadge(r.status);
                    return (
                      <tr key={r.id}>
                        <td style={css.td}><code style={{ fontSize: 12, color: "#9c8478" }}>{r.id}</code></td>
                        <td style={css.td}><span style={{ color: "#8b6f5e", fontSize: 13, fontWeight: 600 }}>{store?.name}</span></td>
                        <td style={css.td}><span style={{ fontWeight: 600, color: "#3d2b1f" }}>{p?.name}</span></td>
                        <td style={css.td}><code style={{ fontSize: 12, color: "#9c8478" }}>{b?.batchNo}</code></td>
                        <td style={css.td}>{b && <span style={css.badge(expiryColor(b.expiryDate))}>{b.expiryDate}</span>}</td>
                        <td style={css.td}>{r.qty.toLocaleString()}{p?.unit}</td>
                        <td style={css.td}><span style={{ fontSize: 12, color: "#9c8478" }}>{r.reservedAt}</span></td>
                        <td style={css.td}><span style={css.badge(s.color)}>{s.label}</span></td>
                        <td style={css.td}>
                          {r.deliveryDate
                            ? <span style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>{r.deliveryDate}</span>
                            : <span style={{ color: "#c4a882" }}>—</span>
                          }
                        </td>
                      </tr>
                    );
                  })}
                  {filteredAdminReservations.length === 0 && (
                    <tr><td colSpan={8} style={{ ...css.td, textAlign: "center", color: "#9c8478", padding: 40 }}>該当する予約がありません</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Batch stock summary */}
            <div style={css.card}>
              <div style={css.cardTitle}>📊 バッチ在庫サマリー</div>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>商品名</th>
                    <th style={css.th}>バッチNo.</th>
                    <th style={css.th}>賞味期限</th>
                    <th style={css.th}>総数</th>
                    <th style={css.th}>予約済</th>
                    <th style={css.th}>残数</th>
                    <th style={css.th}>消化率</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b) => {
                    const p = getProduct(b.productId);
                    const avail = availableQty(b);
                    const pct = Math.round((b.reservedQty / b.totalQty) * 100);
                    return (
                      <tr key={b.id}>
                        <td style={css.td}><span style={{ fontWeight: 600, color: "#3d2b1f" }}>{p?.name}</span></td>
                        <td style={css.td}><code style={{ fontSize: 12, color: "#9c8478" }}>{b.batchNo}</code></td>
                        <td style={css.td}><span style={css.badge(expiryColor(b.expiryDate))}>{b.expiryDate}</span></td>
                        <td style={css.td}>{b.totalQty.toLocaleString()}</td>
                        <td style={css.td}><span style={{ color: "#c47c2b", fontWeight: 600 }}>{b.reservedQty.toLocaleString()}</span></td>
                        <td style={css.td}><span style={{ fontWeight: 700, color: avail > 0 ? "#4a7c59" : "#c0392b" }}>{avail.toLocaleString()}</span></td>
                        <td style={css.td}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ background: "#e8ddd4", borderRadius: 99, height: 6, width: 100, overflow: "hidden" }}>
                              <div style={{ background: pct > 80 ? "#c0392b" : pct > 50 ? "#c47c2b" : "#4a7c59", width: `${pct}%`, height: "100%", borderRadius: 99 }} />
                            </div>
                            <span style={{ fontSize: 11, color: "#9c8478", minWidth: 30 }}>{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── 予約モーダル ── */}
      {modal && (
        <div style={css.modal} onClick={() => setModal(null)}>
          <div style={css.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#3d2b1f", marginBottom: 20 }}>🛒 在庫予約</div>
            <div style={{ background: "#faf7f4", border: "1px solid #e8ddd4", borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ color: "#9c8478", fontSize: 11, marginBottom: 8 }}>予約対象</div>
              <div style={{ fontWeight: 700, color: "#3d2b1f", fontSize: 15, marginBottom: 4 }}>{modal.product.name}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <code style={{ fontSize: 12, color: "#9c8478" }}>{modal.batch.batchNo}</code>
                <span style={css.badge(expiryColor(modal.batch.expiryDate))}>期限 {modal.batch.expiryDate}</span>
              </div>
              <div style={{ marginTop: 12, fontSize: 13 }}>
                <span style={{ color: "#9c8478" }}>予約可能数：</span>
                <span style={{ fontWeight: 700, color: "#4a7c59" }}>{availableQty(modal.batch).toLocaleString()} {modal.product.unit}</span>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ ...css.filterLabel, marginBottom: 6 }}>予約数量（{modal.product.unit}）</div>
              <input
                style={{ ...css.input, fontSize: 18, fontWeight: 700, textAlign: "center" }}
                type="number"
                min={1}
                max={availableQty(modal.batch)}
                value={reserveQty}
                onChange={e => setReserveQty(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ ...css.filterLabel, marginBottom: 6 }}>備考（任意）</div>
              <textarea
                style={{ ...css.input, resize: "vertical", minHeight: 72, lineHeight: 1.6 }}
                placeholder="例：バレンタイン販促用、試食イベント用、欠品補充など"
                value={reserveNote}
                onChange={e => setReserveNote(e.target.value)}
                maxLength={200}
              />
              <div style={{ textAlign: "right", fontSize: 11, color: "#c4a882", marginTop: 2 }}>{reserveNote.length}/200</div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{ ...css.btn("ghost"), flex: 1, padding: 12 }} onClick={() => { setModal(null); setReserveNote(""); }}>キャンセル</button>
              <button style={{ ...css.btn("primary"), flex: 2, padding: 12, fontSize: 14 }} onClick={handleReserve}>✓ 予約を確定する</button>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "#9c8478", textAlign: "center" }}>予約は即時確定されます（先着順）</div>
          </div>
        </div>
      )}
    </div>
  );
}
