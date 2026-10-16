// Rounded editorial estimates for the stated prepared-food portion, not lab values.
// Reference approach: estimate a prepared serving, including its usual sauce;
// rice/bread sides are included only when named (e.g. bowls, wraps, sandwiches).
// These are not nutritional measurements copied from a national database.
// Portion/label guidance: https://www.nhs.uk/better-health/lose-weight/calorie-counting/
// Food-composition reference: https://fdc.nal.usda.gov/
// Columns: ko | en | ja | zh | kcal | reference portion | cuisine | search aliases.
// Related foods with different recipes are separate records; aliases must not duplicate calories.
window.FreeUtilWorldFoodRows = `돌솥비빔밥|Hot stone bibimbap|石焼ビビンバ|石锅拌饭|650|1인분 (450g)|korea|dolsot bibimbap,石焼きビビンバ
콩국수|Soy milk noodles|豆乳冷麺|豆浆面|600|1인분 (550g)|korea|kongguksu,콩 국수
비빔국수|Spicy mixed noodles|ビビン麺|韩式辣拌面|500|1인분 (350g)|korea|bibim guksu,비빔 국수
쫄면|Chewy spicy noodles|チョルミョン|筋道辣拌面|550|1인분 (350g)|korea|jjolmyeon
막국수|Buckwheat cold noodles|マッククス|荞麦冷面|500|1인분 (450g)|korea|makguksu
들깨칼국수|Perilla noodle soup|えごまカルグクス|紫苏籽刀切面|650|1인분 (550g)|korea|deulkkae kalguksu
낙지볶음|Spicy octopus stir-fry|たこの辛味炒め|辣炒章鱼|350|1인분 (250g)|korea|nakji bokkeum
해물파전|Seafood scallion pancake|海鮮ねぎチヂミ|海鲜葱饼|600|1장 (250g)|korea|haemul pajeon,해물 파전
녹두전|Mung bean pancake|緑豆チヂミ|绿豆煎饼|350|1장 (150g)|korea|bindaetteok,빈대떡,녹두빈대떡
육회|Seasoned raw beef|ユッケ|韩式生拌牛肉|300|1인분 (150g)|korea|yukhoe
간장게장|Soy-marinated crab|カンジャンケジャン|酱油腌蟹|200|1인분 (150g)|korea|ganjang gejang
양념게장|Spicy marinated crab|ヤンニョムケジャン|辣酱腌蟹|250|1인분 (150g)|korea|yangnyeom gejang
아귀찜|Spicy braised monkfish|アンコウ蒸し|辣炖安康鱼|400|1인분 (350g)|korea|아구찜,agujjim,agwi jjim
찜닭|Soy-braised chicken|チムタク|酱炖鸡|650|1인분 (350g)|korea|jjimdak,안동찜닭
떡갈비|Grilled short rib patties|トッカルビ|韩式牛肉饼|450|1인분 (180g)|korea|tteokgalbi
갈비찜|Braised beef short ribs|カルビチム|炖牛排骨|600|1인분 (250g)|korea|galbijjim,소갈비찜
김치찜|Braised pork and kimchi|豚キムチ煮込み|猪肉炖泡菜|500|1인분 (350g)|korea|kimchi jjim,돼지김치찜
도삭면|Knife-shaved noodles|刀削麺|刀削面|600|1인분 (500g)|china|dao xiao mian,daoxiaomian,刀削麵
우육면|Beef noodle soup|牛肉麺|牛肉面|600|1그릇 (550g)|china|우육탕면,niu rou mian,niurou mian,牛肉麵
탄탄면|Dan dan noodles|担々麺|担担面|650|1그릇 (450g)|china|단단면,단단몐,dan dan mian,dandan noodles,擔擔麵
완탕면|Wonton noodle soup|ワンタン麺|云吞面|450|1그릇 (500g)|china|wantan noodles,雲吞麵,馄饨面
완탕|Wonton soup|ワンタンスープ|馄饨汤|250|1그릇 (300g)|china|wonton,huntun,雲吞,餛飩
차슈|Char siu pork|チャーシュー|叉烧肉|300|100g|china|char siu,charsiu,叉燒,차시우
북경오리|Peking duck|北京ダック|北京烤鸭|450|1인분 (150g)|china|베이징덕,베이징카오야,peking duck,beijing duck
동파육|Dongpo pork|東坡肉|东坡肉|550|1인분 (180g)|china|dong po rou,dongpo rou
꿔바로우|Guo bao rou|鍋包肉|锅包肉|550|1인분 (250g)|china|궈바오러우,guo bao rou,鍋包肉
궁보계정|Kung pao chicken|宮保鶏丁|宫保鸡丁|450|1인분 (250g)|china|쿵파오치킨,궁바오지딩,kung pao,gong bao ji ding
라조기|Chilli chicken stir-fry|鶏の唐辛子炒め|辣椒鸡丁|500|1인분 (250g)|china|lajiao chicken,라쟈오지
어향가지|Fish-fragrant eggplant|魚香茄子|鱼香茄子|350|1인분 (250g)|china|위샹체쯔,yu xiang qie zi
지삼선|Stir-fried potato eggplant pepper|地三鮮|地三鲜|400|1인분 (250g)|china|디싼셴,di san xian
토마토계란볶음|Tomato and egg stir-fry|トマト卵炒め|番茄炒蛋|280|1인분 (250g)|china|시홍스차오지단,토달볶,fan qie chao dan
짜사이|Pickled mustard stem|ザーサイ|榨菜|40|50g|china|자차이,zha cai,zhacai
하가우|Shrimp dumplings|海老蒸し餃子|虾饺|200|4개 (120g)|china|har gow,하가오,蝦餃
슈마이|Siu mai|シュウマイ|烧卖|250|4개 (120g)|china|샤오마이,시우마이,siu mai,shumai,燒賣
차슈바오|Char siu bao|チャーシューまん|叉烧包|220|1개 (90g)|china|차시우바오,char siu bun,叉燒包
춘권|Spring rolls|春巻き|春卷|250|2개 (100g)|china|spring roll,harumaki,春捲
파전병|Scallion pancake|葱油餅|葱油饼|300|1장 (100g)|china|총유병,충유빙,cong you bing,scallion pancake
량피|Liangpi noodles|涼皮|凉皮|450|1인분 (300g)|china|량피면,liang pi,涼皮
러우자모|Roujiamo|ロージャーモー|肉夹馍|450|1개 (180g)|china|로우지아모,rou jia mo,肉夾饃
창펀|Rice noodle rolls|腸粉|肠粉|250|1인분 (200g)|china|청펀,cheung fun,chang fen,腸粉
루러우판|Taiwanese braised pork rice|魯肉飯|卤肉饭|650|1그릇 (350g)|taiwan|루로우판,루러우밥,lu rou fan,滷肉飯,魯肉飯
지파이|Taiwanese fried chicken cutlet|台湾フライドチキン|大鸡排|550|1개 (200g)|taiwan|대만치킨,ji pai,雞排
우육탕|Beef soup|牛肉スープ|牛肉汤|250|1그릇 (350g)|taiwan|niu rou tang,牛肉湯
파인애플케이크|Pineapple cake|パイナップルケーキ|凤梨酥|180|1개 (40g)|taiwan|펑리수,feng li su,鳳梨酥
홋카이도수프카레|Hokkaido soup curry|北海道スープカレー|北海道汤咖喱|500|1인분 (450g)|japan|훗카이도수프카레,수프카레,스프카레,soup curry
오야코동|Chicken and egg rice bowl|親子丼|亲子丼|650|1그릇 (400g)|japan|oyakodon,親子丼
부타동|Pork rice bowl|豚丼|猪肉丼|700|1그릇 (400g)|japan|butadon
가라아게|Japanese fried chicken|唐揚げ|日式炸鸡|350|5개 (150g)|japan|카라아게,karaage,から揚げ,からあげ
야키토리|Yakitori|焼き鳥|日式烤鸡串|200|2개 (100g)|japan|yakitori,焼鳥
아게다시두부|Agedashi tofu|揚げ出し豆腐|日式炸豆腐|250|1인분 (180g)|japan|아게다시도후,agedashi tofu
차완무시|Chawanmushi|茶碗蒸し|日式蒸蛋|100|1컵 (150g)|japan|자완무시,chawan mushi
나베|Japanese hot pot|鍋料理|日式火锅|400|1인분 (400g)|japan|nabe,nabemono
스키야키|Sukiyaki|すき焼き|寿喜烧|600|1인분 (350g)|japan|sukiyaki,すきやき,壽喜燒
샤부샤부|Shabu-shabu|しゃぶしゃぶ|涮涮锅|400|1인분 (350g)|japan|샤브샤브,shabu shabu,涮涮鍋
미소라멘|Miso ramen|味噌ラーメン|味噌拉面|650|1그릇 (550g)|japan|miso ramen
쇼유라멘|Shoyu ramen|醤油ラーメン|酱油拉面|550|1그릇 (550g)|japan|간장라멘,shoyu ramen,しょうゆラーメン
시오라멘|Shio ramen|塩ラーメン|盐味拉面|500|1그릇 (550g)|japan|소금라멘,shio ramen
츠케멘|Tsukemen|つけ麺|蘸面|700|1인분 (450g)|japan|쓰케멘,tsuke men
나가사키짬뽕|Nagasaki champon|長崎ちゃんぽん|长崎什锦面|650|1그릇 (550g)|japan|나가사키짬폰,champon
히야시추카|Chilled ramen salad|冷やし中華|日式凉拌拉面|500|1인분 (350g)|japan|hiyashi chuka
오차즈케|Ochazuke|お茶漬け|茶泡饭|300|1그릇 (350g)|japan|ochazuke,오챠즈케
나토밥|Natto rice|納豆ご飯|纳豆饭|400|1그릇 (250g)|japan|낫토밥,natto gohan,納豆飯
다이후쿠|Daifuku|大福|大福|180|1개 (70g)|japan|daifuku,다이후꾸
도라야키|Dorayaki|どら焼き|铜锣烧|280|1개 (100g)|japan|dorayaki,銅鑼燒
당고|Dango|団子|日式团子|180|1개 (80g)|japan|dango,だんご
타이야키|Taiyaki|たい焼き|日式鲷鱼烧|220|1개 (90g)|japan|taiyaki,鯛焼き
소고기쌀국수|Beef pho|牛肉フォー|越南牛肉河粉|500|1그릇 (600g)|vietnam|퍼보,포보,pho bo,phở bò,pho beef
닭고기쌀국수|Chicken pho|鶏肉フォー|越南鸡肉河粉|450|1그릇 (600g)|vietnam|퍼가,포가,pho ga,phở gà
분보후에|Bun bo Hue|ブンボーフエ|顺化牛肉米粉|550|1그릇 (600g)|vietnam|bun bo hue,bún bò Huế
분팃느엉|Grilled pork vermicelli bowl|焼き豚のブン|越南烤猪肉米粉|600|1그릇 (400g)|vietnam|bun thit nuong,bún thịt nướng
반미|Banh mi|バインミー|越南法棍三明治|550|1개 (250g)|vietnam|바인미,banh mi,bánh mì
반쎄오|Banh xeo|バインセオ|越南煎饼|450|1장 (250g)|vietnam|바인쎄오,반세오,banh xeo,bánh xèo
짜조|Vietnamese fried spring rolls|ベトナム揚げ春巻き|越式炸春卷|300|3개 (150g)|vietnam|차조,cha gio,chả giò,nem ran,nem rán
고이꾸온|Vietnamese fresh rolls|ベトナム生春巻き|越式生春卷|200|2개 (180g)|vietnam|고이쿤,goi cuon,gỏi cuốn
껌땀|Broken rice with grilled pork|コムタム|越南碎米猪排饭|700|1인분 (450g)|vietnam|콤땀,com tam,cơm tấm
까오라우|Cao lau|カオラウ|会安高楼面|550|1그릇 (400g)|vietnam|카오라우,cao lau,cao lầu
분리에우|Crab noodle soup|蟹のブン|越南蟹汤米粉|450|1그릇 (550g)|vietnam|bun rieu,bún riêu
베트남연유커피|Vietnamese condensed milk coffee|ベトナム練乳コーヒー|越南炼乳咖啡|180|1잔 (200ml)|vietnam|카페쓰어다,ca phe sua da,cà phê sữa đá
팟씨유|Pad see ew|パッシーイウ|泰式酱油炒河粉|650|1인분 (350g)|thailand|팟시유,pad see ew,phat si io,ผัดซีอิ๊ว
팟끄라파오|Holy basil stir-fry with rice|ガパオライス|泰式打抛饭|700|1인분 (400g)|thailand|가파오라이스,팟카파오,pad kra pao,pad krapow,ผัดกะเพรา
솜땀|Green papaya salad|ソムタム|青木瓜沙拉|150|1인분 (200g)|thailand|쏨땀,som tam,somtum,ส้มตำ
라브|Larb salad|ラープ|泰老式肉末沙拉|300|1인분 (200g)|thailand|랍,라프,larb,laap,ลาบ
똠카가이|Tom kha gai|トムカーガイ|椰奶鸡汤|350|1그릇 (350g)|thailand|톰카가이,tom kha gai,ต้มข่าไก่
마사만커리|Massaman curry|マッサマンカレー|马萨曼咖喱|550|1인분 (300g)|thailand|마싸만카레,massaman curry,แกงมัสมั่น
레드커리|Thai red curry|タイレッドカレー|泰式红咖喱|500|1인분 (300g)|thailand|레드카레,red curry,gaeng phet,แกงเผ็ด
파냉커리|Panang curry|パネーンカレー|帕能咖喱|550|1인분 (300g)|thailand|파낭커리,panang,phanaeng,พะแนง
카오만가이|Thai chicken rice|カオマンガイ|泰式鸡饭|650|1인분 (400g)|thailand|카우만가이,khao man gai,ข้าวมันไก่
카오소이|Khao soi|カオソーイ|泰北咖喱面|650|1그릇 (450g)|thailand|카우소이,khao soi,ข้าวซอย
망고찰밥|Mango sticky rice|マンゴースティッキーライス|芒果糯米饭|450|1인분 (250g)|thailand|망고스티키라이스,khao niao mamuang,mango sticky rice
태국밀크티|Thai milk tea|タイミルクティー|泰式奶茶|250|1잔 (300ml)|thailand|차옌,차이옌,thai tea,cha yen,ชาเย็น
르당|Beef rendang|ルンダン|仁当牛肉|450|1인분 (200g)|indonesia|렌당,렌당소고기,rendang
미고렝|Mie goreng|ミーゴレン|印尼炒面|600|1인분 (350g)|indonesia|미고랭,mie goreng,mee goreng
사테아얌|Chicken satay|サテアヤム|沙爹鸡肉串|350|4개 (180g)|indonesia|사떼,사테,sate ayam,satay chicken
가도가도|Gado-gado|ガドガド|加多加多蔬菜沙拉|350|1인분 (300g)|indonesia|gado gado,gado-gado
소토아얌|Soto ayam|ソトアヤム|印尼鸡汤|300|1그릇 (400g)|indonesia|soto ayam
박소|Bakso meatball soup|バクソ|印尼肉丸汤|350|1그릇 (450g)|indonesia|bakso,bakso sapi
템페구이|Grilled tempeh|焼きテンペ|烤天贝|220|100g|indonesia|템페,tempeh,tempe,天貝
나시파당|Nasi Padang|ナシパダン|巴东饭|800|1인분 (450g)|indonesia|nasi padang
나시르막|Nasi lemak|ナシレマ|椰浆饭|650|1인분 (350g)|malaysia|나시레막,nasi lemak
차퀘이테오|Char kway teow|チャークイティオ|炒粿条|700|1인분 (350g)|malaysia|차퀘티아오,char kway teow,炒粿條
로티차나이|Roti canai|ロティチャナイ|印度煎饼|350|1장 (100g)|malaysia|로티카나이,roti canai,roti prata
나시칸다르|Nasi kandar|ナシカンダー|扁担饭|750|1인분 (450g)|malaysia|nasi kandar
싱가포르락사|Singapore laksa|シンガポールラクサ|新加坡叻沙|650|1그릇 (500g)|singapore|락사,laksa,nyonya laksa,叻沙
하이난치킨라이스|Hainanese chicken rice|海南チキンライス|海南鸡饭|650|1인분 (400g)|singapore|하이난닭고기밥,hainan chicken rice,海南雞飯
칠리크랩|Chilli crab|チリクラブ|辣椒蟹|450|1인분 (250g)|singapore|칠리크랩소스포함,chili crab,chilli crab
박쿠테|Bak kut teh|バクテー|肉骨茶|400|1그릇 (400g)|singapore|바쿠테,bak kut teh
카야토스트|Kaya toast|カヤトースト|咖椰吐司|300|2장 (100g)|singapore|kaya toast
치킨아도보|Chicken adobo|チキンアドボ|菲律宾酱醋鸡|400|1인분 (250g)|philippines|아도보,adobong manok,chicken adobo
시니강|Sinigang|シニガン|菲律宾酸汤|300|1그릇 (400g)|philippines|sinigang
시시그|Pork sisig|シシグ|菲律宾铁板碎猪肉|500|1인분 (200g)|philippines|sisig
판싯비혼|Pancit bihon|パンシットビーフン|菲律宾炒米粉|450|1인분 (300g)|philippines|판시트,pancit bihon,pansit
룸피아|Lumpia|ルンピア|菲律宾春卷|250|3개 (120g)|philippines|lumpia,lumpiang shanghai
할로할로|Halo-halo|ハロハロ|菲律宾什锦冰|400|1컵 (300g)|philippines|halo halo,halo-halo
모힝가|Mohinga|モヒンガー|缅甸鱼汤米线|400|1그릇 (450g)|myanmar|모힝가국수,mohinga,မုန့်ဟင်းခါး
아목|Fish amok|アモック|柬式椰奶蒸鱼|350|1인분 (250g)|cambodia|아목트레이,amok trey,fish amok
록락|Beef lok lak|ロックラック|柬式炒牛肉|450|1인분 (250g)|cambodia|록락,lok lak,loc lac
버터치킨|Butter chicken|バターチキン|黄油鸡|450|1인분 (250g)|india|무르그마크니,murgh makhani,butter chicken
치킨티카마살라|Chicken tikka masala|チキンティッカマサラ|鸡肉提卡马萨拉|450|1인분 (250g)|india|치킨티카마쌀라,chicken tikka masala
치킨티카|Chicken tikka|チキンティッカ|印度香料烤鸡块|300|1인분 (180g)|india|chicken tikka
팔락파니르|Palak paneer|パラクパニール|菠菜奶豆腐|350|1인분 (250g)|india|팔락파니어,palak paneer
차나마살라|Chana masala|チャナマサラ|鹰嘴豆咖喱|300|1인분 (250g)|india|차나마쌀라,촐레,chole,chana masala
달타드카|Dal tadka|ダールタルカ|香料扁豆汤|250|1인분 (250g)|india|달,dhal,daal,dal tadka
달마크니|Dal makhani|ダールマカニ|奶油黑扁豆咖喱|350|1인분 (250g)|india|달마카니,dal makhani
알루고비|Aloo gobi|アルゴビ|土豆花椰菜咖喱|250|1인분 (250g)|india|알루고비커리,aloo gobi
로간조쉬|Rogan josh|ローガンジョシュ|克什米尔羊肉咖喱|450|1인분 (250g)|india|로건조시,rogan josh
치킨빈달루|Chicken vindaloo|チキンビンダルー|文达卢鸡肉咖喱|400|1인분 (250g)|india|빈달루,vindaloo
치킨비리야니|Chicken biryani|チキンビリヤニ|鸡肉香饭|700|1인분 (400g)|india|치킨브리야니,biryani,biriyani
야채비리야니|Vegetable biryani|野菜ビリヤニ|蔬菜香饭|550|1인분 (400g)|india|베지비리야니,veg biryani
도사|Plain dosa|ドーサ|印度薄脆饼|180|1장 (100g)|india|도샤,dosa,dosai
마살라도사|Masala dosa|マサラドーサ|土豆馅印度薄饼|400|1장 (250g)|india|masala dosa
이들리|Idli|イドゥリ|印度蒸米糕|150|2개 (100g)|india|이드리,idli,idly
우타팜|Uttapam|ウッタパム|印度厚米饼|250|1장 (180g)|india|uttapam,uthappam
차파티|Chapati|チャパティ|印度全麦薄饼|120|1장 (40g)|india|차파띠,chapati,chapatti,로티,roti
파라타|Paratha|パラタ|印度油煎薄饼|250|1장 (80g)|india|파라타빵,paratha,parantha
굴랍자문|Gulab jamun|グラブジャムン|糖浆奶球|300|2개 (100g)|india|굴라브자문,gulab jamun
라시|Sweet lassi|ラッシー|印度酸奶饮|200|1잔 (250ml)|india|lassi,라씨
망고라시|Mango lassi|マンゴーラッシー|芒果拉西|250|1잔 (250ml)|india|mango lassi
마살라차이|Masala chai|マサラチャイ|印度香料奶茶|120|1잔 (200ml)|india|차이,chai,masala chai
모모|Steamed momo|モモ|喜马拉雅蒸饺|300|6개 (200g)|nepal|momo,momos,मोमो
달밧|Dal bhat|ダルバート|尼泊尔扁豆饭|650|1인분 (450g)|nepal|dal bhat,달바트
치킨카라히|Chicken karahi|チキンカラヒ|巴基斯坦炒锅鸡|450|1인분 (250g)|pakistan|카라이,chicken karahi,kadai chicken
니하리|Nihari|ニハリ|巴基斯坦慢炖肉|500|1인분 (300g)|pakistan|nihari,نہاری
카르보나라|Carbonara|カルボナーラ|培根蛋酱意面|750|1인분 (300g)|italy|까르보나라,carbonara,spaghetti alla carbonara
볼로네제|Pasta Bolognese|ボロネーゼ|肉酱意面|650|1인분 (350g)|italy|볼로냐파스타,bolognese,ragù alla bolognese,라구파스타
봉골레파스타|Spaghetti alle vongole|ボンゴレ|蛤蜊意面|550|1인분 (300g)|italy|봉골레,vongole,spaghetti alle vongole
페스토파스타|Pesto pasta|ジェノベーゼパスタ|青酱意面|650|1인분 (300g)|italy|제노베제,제노베세,pesto,pasta al pesto,genovese
펜네아라비아타|Penne arrabbiata|ペンネアラビアータ|香辣番茄通心粉|500|1인분 (300g)|italy|아라비아타,아라비아따,arrabbiata
뇨키|Potato gnocchi|ニョッキ|意式土豆团子|500|1인분 (250g)|italy|뇨끼,gnocchi
라비올리|Ravioli|ラビオリ|意式馅饺|500|1인분 (250g)|italy|ravioli
토르텔리니|Tortellini|トルテリーニ|意式环形馅面|550|1인분 (250g)|italy|tortellini
미네스트로네|Minestrone|ミネストローネ|意式蔬菜汤|180|1그릇 (300g)|italy|미네스트로니,minestrone
카프레제|Caprese salad|カプレーゼ|卡普雷塞沙拉|300|1인분 (200g)|italy|카프레세,insalata caprese
브루스케타|Bruschetta|ブルスケッタ|意式番茄烤面包|250|2조각 (120g)|italy|브루스케따,bruschetta
포카치아|Focaccia|フォカッチャ|佛卡夏|300|100g|italy|포카챠,focaccia
아란치니|Arancini|アランチーニ|意式炸饭团|250|1개 (100g)|italy|아란치노,arancini,arancino
오소부코|Osso buco|オッソブーコ|意式炖牛膝|500|1인분 (300g)|italy|오쏘부꼬,ossobuco,osso buco
판나코타|Panna cotta|パンナコッタ|意式奶冻|300|1개 (150g)|italy|파나코타,panna cotta
카놀리|Cannoli|カンノーリ|西西里奶酪卷|250|1개 (80g)|italy|까놀리,cannoli,cannolo
젤라토|Gelato|ジェラート|意式冰淇淋|200|100g|italy|gelato,젤라또
라타투이|Ratatouille|ラタトゥイユ|法式炖蔬菜|150|1인분 (250g)|france|라따뚜이,ratatouille
뵈프부르기뇽|Beef bourguignon|ブフブルギニョン|勃艮第红酒炖牛肉|500|1인분 (300g)|france|비프부르기뇽,boeuf bourguignon,bœuf bourguignon
코코뱅|Coq au vin|コックオーヴァン|红酒炖鸡|450|1인분 (300g)|france|코크오뱅,coq au vin
키슈로렌|Quiche Lorraine|キッシュロレーヌ|洛林咸派|450|1조각 (180g)|france|키쉬로렌,quiche lorraine
크로크무슈|Croque monsieur|クロックムッシュ|法式火腿芝士三明治|550|1개 (200g)|france|크로크무쉐,croque monsieur
크로크마담|Croque madame|クロックマダム|法式煎蛋火腿三明治|650|1개 (250g)|france|croque madame
프렌치어니언수프|French onion soup|オニオングラタンスープ|法式洋葱汤|300|1그릇 (350g)|france|양파수프,french onion soup,soupe à l'oignon
부야베스|Bouillabaisse|ブイヤベース|马赛鱼汤|350|1인분 (400g)|france|부야베쓰,bouillabaisse
덕콩피|Duck confit|鴨のコンフィ|油封鸭|550|1인분 (250g)|france|오리콩피,confit de canard,duck confit
갈레트|Savoury buckwheat galette|そば粉のガレット|荞麦咸可丽饼|450|1장 (220g)|france|메밀갈레트,galette bretonne
크레페|Sweet crepe|クレープ|甜可丽饼|250|1장 (120g)|france|크레이프,crepe,crêpe
크렘브륄레|Creme brulee|クレームブリュレ|焦糖布丁|300|1개 (120g)|france|크림브륄레,creme brulee,crème brûlée
에클레어|Eclair|エクレア|闪电泡芙|250|1개 (80g)|france|에끌레어,eclair,éclair
마들렌|Madeleine|マドレーヌ|玛德琳|150|2개 (40g)|france|madeleine
슈니첼|Schnitzel|シュニッツェル|维也纳炸肉排|550|1인분 (200g)|austria|비너슈니첼,wiener schnitzel
브라트부르스트|Bratwurst|ブラートヴルスト|德式煎香肠|300|1개 (100g)|germany|브랏부어스트,bratwurst
커리부르스트|Currywurst|カリーヴルスト|咖喱香肠|450|1인분 (180g)|germany|커리부어스트,currywurst
자우어크라우트|Sauerkraut|ザワークラウト|德式酸菜|30|100g|germany|사우어크라우트,sauerkraut
슈페츨레|Spaetzle|シュペッツレ|德式面疙瘩|350|1인분 (200g)|germany|스페츨레,spaetzle,spätzle
굴라시|Goulash|グヤーシュ|匈牙利炖牛肉|400|1인분 (350g)|hungary|구야시,구야쉬,goulash,gulyás
피에로기|Pierogi|ピエロギ|波兰饺子|400|6개 (250g)|poland|피에로지,pierogi
보르시치|Borscht|ボルシチ|罗宋汤|200|1그릇 (350g)|ukraine|보르쉬,보르슈,borscht,borsch,борщ
펠메니|Pelmeni|ペリメニ|俄式饺子|450|1인분 (250g)|russia|펠메니만두,pelmeni,пельмени
비프스트로가노프|Beef stroganoff|ビーフストロガノフ|俄式奶油炖牛肉|500|1인분 (250g)|russia|스트로가노프,beef stroganoff
블리니|Blini|ブリヌイ|俄式薄饼|250|3장 (150g)|russia|블린,blini,блины
해산물파에야|Seafood paella|海鮮パエリア|海鲜烩饭|600|1인분 (400g)|spain|빠에야,파에야,paella,paella de marisco
파타타스브라바스|Patatas bravas|パタタスブラバス|西班牙辣酱土豆|350|1인분 (200g)|spain|patatas bravas
토르티야에스파뇰라|Spanish potato omelette|スペイン風オムレツ|西班牙土豆蛋饼|300|1조각 (180g)|spain|스페니시오믈렛,tortilla española,tortilla de patatas
가스파초|Gazpacho|ガスパチョ|西班牙冷番茄汤|120|1그릇 (300g)|spain|gazpacho
크로케타스|Spanish croquettes|スペインのコロッケ|西班牙炸丸子|300|3개 (120g)|spain|크로케타,croquetas
추로스|Churros|チュロス|吉拿棒|300|3개 (100g)|spain|츄러스,churros
파스텔드나타|Pastel de nata|パステルデナタ|葡式蛋挞|230|1개 (70g)|portugal|파스텔데나타,pastel de nata,pastéis de nata
바칼라우아브라스|Bacalhau a Bras|バカリャウアブラス|葡式鳕鱼炒蛋薯丝|500|1인분 (300g)|portugal|바칼랴우아브라스,bacalhau à brás
피시앤칩스|Fish and chips|フィッシュアンドチップス|炸鱼薯条|900|1인분 (400g)|uk|피쉬앤칩스,fish and chips,fish & chips
셰퍼드파이|Shepherd's pie|シェパーズパイ|牧羊人派|550|1인분 (350g)|uk|쉐퍼드파이,shepherds pie,shepherd's pie
코티지파이|Cottage pie|コテージパイ|牛肉土豆派|550|1인분 (350g)|uk|cottage pie
잉글리시브렉퍼스트|Full English breakfast|イングリッシュブレックファスト|英式全套早餐|850|1인분 (450g)|uk|영국식아침,full english,english breakfast
뱅어스앤매시|Bangers and mash|バンガーズアンドマッシュ|香肠配土豆泥|650|1인분 (350g)|uk|소시지매시,bangers and mash
스웨디시미트볼|Swedish meatballs|スウェーデンミートボール|瑞典肉丸|500|1인분 (250g)|sweden|스웨덴미트볼,köttbullar,kottbullar
그라브락스|Gravlax|グラブラックス|北欧腌三文鱼|200|100g|sweden|그라브락스연어,gravlax,gravad lax
스뫼레브뢰|Smorrebrod|スモーブロー|丹麦开放式三明治|350|1개 (180g)|denmark|스모르브로드,smørrebrød,smorrebrod
무사카|Moussaka|ムサカ|希腊茄子肉酱烤菜|500|1인분 (300g)|greece|무싸카,moussaka,μουσακάς
수블라키|Souvlaki|スブラキ|希腊烤肉串|350|2개 (200g)|greece|수블라끼,souvlaki
기로스피타|Gyros pita|ギロピタ|希腊烤肉皮塔饼|650|1개 (300g)|greece|기로스,자이로,자이로스,gyros,gyro pita
짜지키|Tzatziki|ザジキ|希腊黄瓜酸奶酱|100|100g|greece|차지키,tzatziki,τζατζίκι
스파나코피타|Spanakopita|スパナコピタ|菠菜菲罗派|350|1조각 (150g)|greece|시금치파이,spanakopita
되네르케밥|Doner kebab|ドネルケバブ|土耳其旋转烤肉卷|650|1개 (300g)|turkey|도네르,도너케밥,döner,doner kebab,döner kebap
시시케밥|Shish kebab|シシケバブ|烤肉串|450|1인분 (250g)|turkey|쉬쉬케밥,shish kebab,şiş kebap
라흐마준|Lahmacun|ラフマジュン|土耳其薄肉饼|300|1장 (150g)|turkey|라흐마쥰,lahmacun
피데|Turkish pide|ピデ|土耳其舟形馅饼|600|1개 (300g)|turkey|pide,turkish pide
메네멘|Menemen|メネメン|土式番茄炒蛋|300|1인분 (250g)|turkey|menemen
후무스|Hummus|フムス|鹰嘴豆泥|170|100g|middleeast|훔무스,허머스,호무스,hummus,houmous,حمص
팔라펠|Falafel|ファラフェル|炸鹰嘴豆丸|300|4개 (100g)|middleeast|팔라필,팔라팔,falafel,فلافل
샤와르마|Shawarma wrap|シャワルマ|沙威玛卷|600|1개 (300g)|middleeast|샤워마,샤우르마,shawarma,شاورما
타불레|Tabbouleh|タブレ|中东欧芹小麦沙拉|150|1인분 (180g)|middleeast|타불리,tabbouleh,tabouli,تبولة
바바가누쉬|Baba ganoush|ババガヌーシュ|烤茄子泥|120|100g|middleeast|바바가누시,baba ganoush,baba ghanoush
파투시|Fattoush|ファットゥーシュ|中东脆饼沙拉|200|1인분 (220g)|middleeast|파투쉬,fattoush
샥슈카|Shakshuka|シャクシュカ|北非番茄炖蛋|350|1인분 (300g)|middleeast|샤크슈카,에그인헬,shakshuka,shakshouka,شكشوكة
무자다라|Mujaddara|ムジャッダラ|扁豆米饭|400|1인분 (300g)|middleeast|무자다라밥,mujaddara,mejadra
코프타|Kofta|キョフテ|中东肉丸|400|1인분 (200g)|middleeast|코프테,쿄프테,kofta,köfte,كفتة
돌마|Stuffed grape leaves|ドルマ|葡萄叶包饭|250|5개 (180g)|middleeast|돌마데스,dolma,dolmades
만사프|Mansaf|マンサフ|约旦酸奶羊肉饭|850|1인분 (450g)|middleeast|mansaf,منسف
캅사|Chicken kabsa|カブサ|阿拉伯香料鸡饭|750|1인분 (450g)|middleeast|카브사,kabsa,kabseh,كبسة
마클루바|Maqluba|マクルーバ|倒扣肉菜饭|700|1인분 (400g)|middleeast|마끄루바,maqluba,makloubeh
마나키시|Zaatar manakish|マナキッシュ|扎阿塔尔香料饼|350|1장 (130g)|middleeast|마나이시,manakish,manoushe,manakeesh
바클라바|Baklava|バクラヴァ|果仁蜜酥|200|1조각 (45g)|middleeast|바끌라바,baklava
쿠나파|Kunafa|クナーファ|库纳法奶酪甜点|350|1조각 (120g)|middleeast|크나페,쿠네페,kunafa,knafeh,künefe
케밥코비데|Kabab koobideh|クビデケバブ|伊朗烤肉串|500|1인분 (250g)|iran|쿠비데,kabab koobideh,kebab koobideh
고르메사브지|Ghormeh sabzi|ゴルメサブジ|伊朗香草炖肉|400|1인분 (300g)|iran|고르메삽지,ghormeh sabzi
맥앤치즈|Mac and cheese|マカロニチーズ|芝士通心粉|450|1인분 (250g)|usa|맥앤치즈,macaroni and cheese,mac n cheese,mac & cheese
칠리콘카르네|Chili con carne|チリコンカン|辣肉豆炖菜|350|1그릇 (300g)|usa|칠리콘카네,chili con carne,chilli con carne
풀드포크샌드위치|Pulled pork sandwich|プルドポークサンド|手撕猪肉三明治|650|1개 (280g)|usa|풀드포크버거,pulled pork sandwich
뉴잉글랜드클램차우더|New England clam chowder|クラムチャウダー|新英格兰奶油蛤蜊汤|300|1그릇 (300g)|usa|클램차우더,clam chowder,new england clam chowder
검보|Gumbo|ガンボ|路易斯安那浓汤|350|1그릇 (350g)|usa|감보,gumbo
잠발라야|Jambalaya|ジャンバラヤ|什锦香料饭|550|1인분 (350g)|usa|잠발라야밥,jambalaya
포보이|Po boy sandwich|ポーボーイ|路易斯安那长棍三明治|650|1개 (280g)|usa|포보이샌드위치,po boy,po' boy
루벤샌드위치|Reuben sandwich|ルーベンサンド|鲁本三明治|700|1개 (280g)|usa|reuben sandwich
베이글연어샌드위치|Bagel with smoked salmon|サーモンベーグル|烟熏三文鱼贝果|500|1개 (220g)|usa|록스베이글,bagel and lox,lox bagel
비스킷앤그레이비|Biscuits and gravy|ビスケットアンドグレイビー|美式比司吉肉汁|600|1인분 (250g)|usa|비스킷그레이비,biscuits and gravy
버팔로윙|Buffalo wings|バッファローウィング|水牛城辣鸡翅|500|6개 (200g)|usa|버팔로치킨윙,buffalo wings
콘브레드|Cornbread|コーンブレッド|玉米面包|220|1조각 (70g)|usa|콘브래드,cornbread
콜슬로|Coleslaw|コールスロー|卷心菜沙拉|150|100g|usa|코울슬로,coleslaw,cole slaw
포테이토스킨|Potato skins|ポテトスキン|芝士培根烤土豆皮|350|2개 (180g)|usa|감자스킨,potato skins
스모어|Smores|スモア|烤棉花糖夹心饼|250|1개 (60g)|usa|스모어,s'mores,smores
피칸파이|Pecan pie|ピーカンパイ|碧根果派|500|1조각 (120g)|usa|피컨파이,pecan pie
키라임파이|Key lime pie|キーライムパイ|青柠派|400|1조각 (120g)|usa|키라임파이,key lime pie
푸틴|Poutine|プーティン|加拿大肉汁芝士薯条|700|1인분 (350g)|canada|푸티네,poutine
버터타르트|Butter tart|バタータルト|加拿大黄油塔|250|1개 (65g)|canada|butter tart
나나이모바|Nanaimo bar|ナナイモバー|纳奈莫巧克力条|300|1개 (70g)|canada|nanaimo bar
엔칠라다|Enchiladas|エンチラーダ|墨西哥酱烤卷饼|550|2개 (300g)|mexico|엔칠라다스,enchiladas,enchilada
칠라킬레스|Chilaquiles|チラキレス|墨西哥酱煮玉米片|550|1인분 (350g)|mexico|칠라키레스,chilaquiles
타말레|Tamales|タマレス|墨西哥玉米粽|300|1개 (150g)|mexico|타말,타말레스,tamale,tamales,tamal
포솔레|Pozole|ポソレ|墨西哥玉米炖肉汤|400|1그릇 (450g)|mexico|포졸레,pozole,posole
몰레치킨|Chicken mole|モレチキン|墨西哥莫莱酱鸡|500|1인분 (300g)|mexico|몰레포블라노,mole poblano,pollo con mole
토스타다|Tostada|トスターダ|墨西哥脆饼|300|1개 (160g)|mexico|토스타다스,tostada,tostadas
토르타|Mexican torta|トルタ|墨西哥三明治|650|1개 (300g)|mexico|멕시칸토르타,torta mexicana
칠레레예노|Chile relleno|チレレジェノ|奶酪酿辣椒|400|1개 (200g)|mexico|칠리레예노,chile relleno,chiles rellenos
비리아타코|Birria tacos|ビリアタコス|炖肉塔可|450|2개 (220g)|mexico|케사비리아,퀘사비리아,birria tacos,quesabirria
과카몰레|Guacamole|ワカモレ|鳄梨酱|150|100g|mexico|과카몰리,와카몰레,guacamole
엘로테|Elote|エローテ|墨西哥烤玉米|300|1개 (180g)|mexico|멕시코옥수수,elote,elotes
아로스콘레체|Arroz con leche|アロスコンレチェ|肉桂牛奶米布丁|250|1컵 (180g)|mexico|쌀푸딩,arroz con leche,rice pudding
트레스레체스케이크|Tres leches cake|トレスレチェケーキ|三奶蛋糕|400|1조각 (150g)|mexico|트레스레체,tres leches
세비체|Ceviche|セビーチェ|酸橘汁腌鱼|250|1인분 (250g)|peru|쎄비체,세비체,céviche,ceviche,cebiche
로모살타도|Lomo saltado|ロモサルタード|秘鲁炒牛肉|650|1인분 (350g)|peru|lomo saltado
아히데가이나|Aji de gallina|アヒデガジーナ|秘鲁奶椒鸡|550|1인분 (300g)|peru|아히데가이냐,ají de gallina,aji de gallina
안티쿠초|Anticuchos|アンティクーチョ|秘鲁烤肉串|300|2개 (180g)|peru|안티쿠초스,anticuchos
페이조아다|Feijoada|フェイジョアーダ|巴西黑豆炖肉|500|1인분 (300g)|brazil|페이주아다,feijoada
팡지케이주|Pao de queijo|ポンデケージョ|巴西芝士球|200|3개 (60g)|brazil|팡데케이조,폰데케이조,pão de queijo,pao de queijo
코시냐|Coxinha|コシーニャ|巴西鸡肉炸包|250|1개 (100g)|brazil|코씽야,coxinha
모케카|Moqueca|ムケッカ|巴西椰奶炖鱼|400|1인분 (300g)|brazil|무케카,moqueca
브리가데이루|Brigadeiro|ブリガデイロ|巴西巧克力球|180|3개 (45g)|brazil|브리가데이로,brigadeiro
아사이볼|Acai bowl|アサイーボウル|巴西莓碗|400|1그릇 (300g)|brazil|아싸이볼,açaí bowl,acai bowl
엠파나다|Empanada|エンパナーダ|拉美馅饼|300|1개 (120g)|argentina|엠빠나다,empanada,empanadas
초리판|Choripan|チョリパン|阿根廷香肠面包|550|1개 (250g)|argentina|choripán,choripan
밀라네사|Milanesa|ミラネサ|拉美炸肉排|550|1인분 (220g)|argentina|밀라네싸,milanesa
알파호르|Alfajor|アルファホール|焦糖夹心饼|250|1개 (60g)|argentina|알파호레스,alfajor,alfajores
아레파|Arepa|アレパ|拉美玉米饼|250|1개 (100g)|colombia|아레빠,arepa,arepas
반데하파이사|Bandeja paisa|バンデハパイサ|哥伦比亚什锦饭|1100|1인분 (650g)|colombia|반데하빠이사,bandeja paisa
아히아코|Ajiaco|アヒアコ|哥伦比亚鸡肉土豆汤|450|1그릇 (450g)|colombia|ajiaco
파베욘크리오요|Pabellon criollo|パベジョンクリオージョ|委内瑞拉黑豆牛肉饭|700|1인분 (450g)|venezuela|파베욘,pabellón criollo,pabellon criollo
카차파|Cachapa|カチャパ|委内瑞拉玉米芝士饼|500|1장 (220g)|venezuela|까차파,cachapa
저크치킨|Jerk chicken|ジャークチキン|牙买加香料烤鸡|450|1인분 (250g)|jamaica|져크치킨,jerk chicken
라이스앤피즈|Rice and peas|ライスアンドピーズ|牙买加椰香豆饭|400|1인분 (250g)|jamaica|라이스앤피스,rice and peas
쿠바노샌드위치|Cuban sandwich|キューバサンド|古巴三明治|700|1개 (300g)|cuba|쿠바샌드위치,쿠바노,cubano,cuban sandwich
로파비에하|Ropa vieja|ロパビエハ|古巴手撕牛肉|400|1인분 (250g)|cuba|ropa vieja
모퐁고|Mofongo|モフォンゴ|波多黎各蒜香捣蕉|500|1인분 (250g)|puertorico|mofongo
타진치킨|Chicken tagine|チキンタジン|摩洛哥塔吉锅鸡|450|1인분 (350g)|morocco|치킨타진,타진,타지네,tagine,tajine
채소쿠스쿠스|Vegetable couscous|野菜クスクス|蔬菜古斯米|400|1인분 (350g)|morocco|쿠스쿠스,쿠스쿠스샐러드,couscous,كسكس
하리라|Harira|ハリラ|摩洛哥扁豆番茄汤|250|1그릇 (350g)|morocco|harira,حريرة
파스티야|Pastilla|パスティラ|摩洛哥肉馅酥派|500|1조각 (200g)|morocco|바스티야,pastilla,bastilla
코샤리|Koshari|コシャリ|埃及米面豆拌饭|650|1인분 (400g)|egypt|쿠샤리,koshari,kushari,كشري
풀메다메스|Ful medames|フールメダンメス|埃及炖蚕豆|300|1인분 (250g)|egypt|풀무담마스,ful medames,foul medames
인제라|Injera|インジェラ|埃塞俄比亚酸饼|180|1장 (120g)|ethiopia|은제라,injera,እንጀራ
도로와트|Doro wat|ドロワット|埃塞俄比亚辣炖鸡|450|1인분 (300g)|ethiopia|도로왓,doro wat,doro wot
미시르와트|Misir wat|ミシルワット|埃塞俄比亚辣炖扁豆|300|1인분 (250g)|ethiopia|미시르왓,misir wat,misir wot
졸로프라이스|Jollof rice|ジョロフライス|西非番茄饭|450|1인분 (300g)|westafrica|졸로프밥,jollof rice,졸로프
에구시수프|Egusi soup|エグシスープ|西非瓜籽炖汤|450|1그릇 (250g)|westafrica|에구시,egusi soup
수야|Suya|スヤ|西非香料烤肉串|350|1인분 (180g)|westafrica|수야꼬치,suya
후푸|Fufu|フフ|西非淀粉团|300|1인분 (200g)|westafrica|푸푸,fufu,foufou
와체|Waakye|ワチェ|加纳豆饭|450|1인분 (300g)|ghana|와케,waakye
마페|Maafe peanut stew|マフェ|西非花生炖肉|500|1인분 (300g)|westafrica|마아페,maafe,mafé,groundnut stew
우갈리|Ugali|ウガリ|东非玉米团|250|1인분 (200g)|eastafrica|우갈리,ugali,posho,sadza
수쿠마위키|Sukuma wiki|スクマウィキ|东非炒羽衣甘蓝|150|1인분 (200g)|eastafrica|수쿠마위키,sukuma wiki
냐마초마|Nyama choma|ニャマチョマ|东非烤肉|400|1인분 (200g)|eastafrica|니아마초마,nyama choma
보보티|Bobotie|ボボティ|南非咖喱蛋奶肉焗|500|1인분 (300g)|southafrica|보보티에,bobotie
버니차우|Bunny chow|バニーチャウ|南非咖喱面包盅|800|1인분 (450g)|southafrica|버니초우,bunny chow
차칼라카|Chakalaka|チャカラカ|南非香辣蔬菜豆炖菜|180|1인분 (200g)|southafrica|차카라카,chakalaka
호주미트파이|Australian meat pie|オーストラリアのミートパイ|澳式肉派|450|1개 (180g)|australia|미트파이,aussie meat pie,australian meat pie
소시지롤|Sausage roll|ソーセージロール|香肠酥卷|400|1개 (120g)|australia|sausage roll
래밍턴|Lamington|ラミントン|拉明顿蛋糕|250|1개 (70g)|australia|라밍턴,lamington
파블로바|Pavlova|パブロバ|巴甫洛娃蛋白霜蛋糕|300|1조각 (120g)|newzealand|파브로바,pavlova
포케볼|Poke bowl|ポキボウル|夏威夷波奇饭|600|1그릇 (400g)|hawaii|포케,포키볼,포키,poke bowl,poké
로코모코|Loco moco|ロコモコ|夏威夷汉堡肉蛋饭|750|1인분 (450g)|hawaii|loco moco
스팸무스비|Spam musubi|スパムむすび|午餐肉饭团|300|1개 (150g)|hawaii|스팸무스비,spam musubi
사이민|Saimin|サイミン|夏威夷汤面|400|1그릇 (500g)|hawaii|사이민국수,saimin`;

window.FreeUtilFoodAliases = {
  '김밥':['kimbap','gim bap'], '라면':['ramyeon','ramyun','라멘 인스턴트'],
  '떡볶이':['tteokbokki','topokki','トッポギ'], '비빔밥':['bibimbab','비빔 밥'],
  '돈가스':['돈까스','돈카츠','とんかつ','豚カツ','tonkatsu','pork katsu'],
  '치즈돈가스':['치즈돈까스','치즈카츠','cheese tonkatsu'],
  '오코노미야키':['오코노미야끼','okonomi yaki','お好み焼','오꼬노미야끼'],
  '타코야키':['타코야끼','다코야키','tako yaki','たこやき'],
  '쌀국수':['포','퍼','phở','越南粉','フォー'],
  '분짜':['분차','bún chả','ブンチャ'],
  '팟타이':['팟타이','팟타이볶음면','padthai','phat thai','ผัดไทย'],
  '똠얌꿍':['똠양꿍','톰얌쿵','tom yam kung','ต้มยำกุ้ง'],
  '그린커리':['그린카레','gaeng khiao wan','แกงเขียวหวาน'],
  '나시고렝':['나시고랭','nasi goreng'], '카오팟':['카우팟','khao pad','khao phat','ข้าวผัด'],
  '난':['naan bread','nan bread','नान'], '사모사':['samosas','समोसा'],
  '우동':['うどん'], '라멘':['라멘','라면 일본식','ramen','らーめん'],
  '돈코츠라멘':['돈코츠라면','톤코츠라멘','tonkotsu','とんこつラーメン'],
  '소바':['메밀소바','蕎麦'], '자루소바':['자루소바','자루소바냉면','ざる蕎麦'],
  '가츠동':['카츠동','돈까스덮밥','katsudon','カツ丼'],
  '카츠카레':['가츠카레','돈까스카레','katsu curry','カツカレー'],
  '규동':['gyudon','gyūdon','牛丼'], '우나기동':['우나동','장어덮밥','unadon','unagi don'],
  '사시미':['회','생선회','sashimi','刺身'], '초밥':['스시','sushi','鮨','すし'],
  '짜장면':['자장면','jjajangmyeon','jajangmyeon','チャジャンミョン'],
  '짬뽕':['짬봉','jjamppong','チャンポン'],
  '마파두부':['마포두부','mapo doufu','má pó dòu fu','麻婆豆腐'],
  '마라탕':['말라탕','malatang','málàtàng','麻辣燙'],
  '마라샹궈':['마라샹궈','마라향궈','mala xiang guo','麻辣香鍋'],
  '훠궈':['훠거','화궈','huoguo','huǒguō','火鍋'],
  '샤오롱바오':['소룡포','쇼롱포','xiaolongbao','xiao long bao','小籠包'],
  '탕수육':['tangsuyuk','糖醋肉'],
  '알리오올리오':['알리오 올리오','aglio e olio','アーリオ・オーリオ'],
  '부리토':['브리또','부리또','브리토','burrito','burritos'],
  '타코':['타코스','taco','tacos'],
  '퀘사디아':['케사디야','퀘사디야','케사디아','quesadilla','quesadillas'],
  '감바스':['감바스알아히요','gambas al ajillo','gambas'],
  '그릭샐러드':['그리스샐러드','horiatiki','χωριάτικη'],
  '계란':['달걀','egg'], '스크램블에그':['스크램블에그','scrambled egg'],
  '닭가슴살':['chicken breast'], '카페라테':['카페라떼','카페라테','caffè latte','cafe latte'],
  '바닐라라테':['바닐라라떼'], '말차라테':['말차라떼','matcha latte'],
  '그릭요거트':['그리스요거트','greek yoghurt','greek yogurt'],
  '요거트':['요구르트','yoghurt','yogurt'], '티라미수':['티라미슈','tiramisù'],
  '아이스크림':['icecream','ice cream'], '우유':['milk','ミルク'],
  '핫도그':['코리안핫도그','corn dog','corndog'],
  '핫도그 샌드위치':['미국식핫도그','hot dog sandwich','hotdog bun']
};
const worldCuisineKeywords = {
  korea:'한국 한식 대한민국 Korean Korea 한국음식 韓国 韓国料理 韩国 韩国菜',
  china:'중국 중식 Chinese China 中国 中華 中国菜 中華料理',
  taiwan:'대만 타이완 Taiwanese Taiwan 台湾 台灣 台湾料理',
  japan:'일본 일식 Japanese Japan 日本 日本料理 和食 日式',
  vietnam:'베트남 Vietnamese Vietnam Việt Nam ベトナム 越南',
  thailand:'태국 타이 Thai Thailand ไทย タイ 泰国 泰國',
  indonesia:'인도네시아 Indonesian Indonesia インドネシア 印尼 印度尼西亚',
  malaysia:'말레이시아 Malaysian Malaysia マレーシア 马来西亚 馬來西亞',
  singapore:'싱가포르 Singapore Singaporean シンガポール 新加坡',
  philippines:'필리핀 Filipino Philippines Pilipinas フィリピン 菲律宾 菲律賓',
  myanmar:'미얀마 버마 Myanmar Burmese ミャンマー 缅甸',
  cambodia:'캄보디아 Cambodia Cambodian Khmer カンボジア 柬埔寨',
  india:'인도 Indian India भारत インド 印度',
  nepal:'네팔 Nepal Nepali नेपाली ネパール 尼泊尔',
  pakistan:'파키스탄 Pakistan Pakistani پاکستان パキスタン 巴基斯坦',
  italy:'이탈리아 이태리 Italian Italy Italia イタリア 意大利 義大利',
  france:'프랑스 French France フランス 法国 法國',
  austria:'오스트리아 Austrian Austria Österreich オーストリア 奥地利',
  germany:'독일 German Germany Deutschland ドイツ 德国 德國',
  hungary:'헝가리 Hungary Hungarian Magyar ハンガリー 匈牙利',
  poland:'폴란드 Poland Polish Polska ポーランド 波兰 波蘭',
  ukraine:'우크라이나 Ukrainian Ukraine Україна ウクライナ 乌克兰',
  russia:'러시아 Russian Russia Россия ロシア 俄罗斯',
  spain:'스페인 Spanish Spain España スペイン 西班牙',
  portugal:'포르투갈 Portuguese Portugal ポルトガル 葡萄牙',
  uk:'영국 브리티시 British England UK United Kingdom イギリス 英国 英國',
  sweden:'스웨덴 Swedish Sweden Sverige スウェーデン 瑞典',
  denmark:'덴마크 Danish Denmark Danmark デンマーク 丹麦 丹麥',
  greece:'그리스 Greek Greece Ελλάδα ギリシャ 希腊 希臘',
  turkey:'튀르키예 터키 Turkish Turkey Türkiye トルコ 土耳其',
  middleeast:'중동 레바논 요르단 사우디 아랍 Middle Eastern Lebanese Jordanian Arabic 中東 中东 黎巴嫩 約旦',
  iran:'이란 페르시아 Iranian Persian Iran ایران イラン 伊朗',
  usa:'미국 미국식 American USA United States アメリカ 米国 美国 美國',
  canada:'캐나다 Canadian Canada カナダ 加拿大',
  mexico:'멕시코 Mexican Mexico México メキシコ 墨西哥',
  peru:'페루 Peruvian Peru Perú ペルー 秘鲁 秘魯',
  brazil:'브라질 Brazilian Brazil Brasil ブラジル 巴西',
  argentina:'아르헨티나 Argentine Argentina アルゼンチン 阿根廷',
  colombia:'콜롬비아 Colombian Colombia コロンビア 哥伦比亚',
  venezuela:'베네수엘라 Venezuelan Venezuela ベネズエラ 委内瑞拉',
  jamaica:'자메이카 Jamaican Jamaica ジャマイカ 牙买加',
  cuba:'쿠바 Cuban Cuba キューバ 古巴',
  puertorico:'푸에르토리코 Puerto Rico Puerto Rican プエルトリコ 波多黎各',
  morocco:'모로코 Moroccan Morocco المغرب モロッコ 摩洛哥',
  egypt:'이집트 Egyptian Egypt مصر エジプト 埃及',
  ethiopia:'에티오피아 Ethiopia Ethiopian エチオピア 埃塞俄比亚',
  westafrica:'서아프리카 나이지리아 세네갈 West African Nigerian Senegalese 西アフリカ 西非 尼日利亚 塞内加尔',
  ghana:'가나 Ghana Ghanaian ガーナ 加纳',
  eastafrica:'동아프리카 케냐 탄자니아 East African Kenyan Tanzanian 東アフリカ 东非 肯尼亚 坦桑尼亚',
  southafrica:'남아프리카 남아공 South African South Africa 南アフリカ 南非',
  australia:'호주 오스트레일리아 Australian Australia オーストラリア 澳大利亚 澳洲',
  newzealand:'뉴질랜드 New Zealand Kiwi ニュージーランド 新西兰 紐西蘭',
  hawaii:'하와이 Hawaiian Hawaii Hawaiʻi ハワイ 夏威夷'
};
window.FreeUtilWorldFoods = window.FreeUtilWorldFoodRows.split('\n').map(line => {
  const [ko,en,ja,zh,energy,portion,cuisine,aliases=''] = line.split('|');
  if (!ko || !en || !ja || !zh || !(Number(energy)>0) || !portion || !worldCuisineKeywords[cuisine]) throw new Error('Invalid world food: '+ko);
  if (window.FreeUtilFoods[ko]) throw new Error('Duplicate food: '+ko);
  window.FreeUtilFoods[ko] = [en,ja,zh];
  window.FreeUtilFoodAliases[ko] = aliases.split(',').filter(Boolean);
  return [ko,worldCuisineKeywords[cuisine],Number(energy),portion];
});
// Add country searches to established dishes too; shared dishes can have several tags.
window.FreeUtilFoodRegions = {};
const existingCuisineGroups = {
  korea:'김밥,라면,떡볶이,김치찌개,된장찌개,미역국,비빔밥,주먹밥,잔치국수,냉면,칼국수,돼지갈비,불고기,제육볶음,닭볶음탕,계란찜,콩나물국,순두부찌개,부대찌개,육개장,설렁탕,순대국,갈비탕,감자탕,닭곰탕,떡국,잡채,김치,멸치볶음,어묵볶음,시금치나물,두부조림,순대,붕어빵,호떡,소주,김치볶음밥,삼계탕,보쌈,족발,닭갈비,소불고기,북엇국,떡만둣국,닭개장,동태찌개,청국장찌개,고추장찌개,수제비,매운탕,알탕,계란말이,동그랑땡,전,고등어조림,연근조림,도토리묵,오이무침,숙주나물,파김치,회덮밥,비빔만두,라볶이,김치전,호두과자,약과,식혜,수정과,매실차,김치만두,고기만두,김말이,닭강정,닭발,곱창,막창,대창,곱창전골,닭발볶음,소떡소떡,핫바,계란빵,빙수,팥빙수,망고빙수,찹쌀떡,인절미,꿀떡,송편,막걸리,김치볶음,애호박볶음,버섯볶음,가지무침,고사리나물,도라지무침,멸치견과볶음,진미채볶음,장조림,어묵탕,김치국,시래기국,우거지국,소고기무국,황태해장국,해물순두부,차돌된장찌개,김치전골,곰탕,도가니탕,추어탕,콩비지찌개,고등어김치찜',
  china:'짬뽕,짜장면,탕수육,마파두부,양장피,깐풍기,칠리새우,유산슬,볶음짬뽕,울면,볶음밥 중식,마라탕,마라샹궈,훠궈,딤섬,샤오롱바오,군만두 중식,팔보채,유린기',
  japan:'우동,규동,유부초밥,오코노미야키,타코야키,야키소바,야키우동,오니기리,가츠동,텐동,카츠카레,라멘,돈코츠라멘,소바,자루소바,우나기동,사시미,초밥,연어초밥,참치초밥,새우초밥,장어초밥,유부초밥 일식,규카츠,멘치카츠,에비후라이,미소된장국,일본식 카레,돈가스',
  vietnam:'월남쌈,쌀국수,분짜',thailand:'팟타이,카오팟,똠얌꿍,그린커리',
  indonesia:'나시고렝',india:'탄두리치킨,난,사모사',
  italy:'스파게티,토마토파스타,크림파스타,알리오올리오,로제파스타,라자냐,리조또,마르게리타피자,페퍼로니피자,고르곤졸라피자,티라미수',
  mexico:'부리토,타코,퀘사디아,나초,살사소스',
  usa:'햄버거,치즈버거,치킨버거,치킨윙,치킨너겟,시카고피자,콥샐러드,브라우니',
  france:'크루아상,마카롱,휘낭시에',spain:'감바스',portugal:'에그타르트',greece:'그릭샐러드'
};
for(const [region,names] of Object.entries(existingCuisineGroups)){
  for(const name of names.split(','))window.FreeUtilFoodRegions[name]=(window.FreeUtilFoodRegions[name]||'')+' '+worldCuisineKeywords[region];
}
const regionalNativeAliases = {
  '소고기쌀국수':['phở bò tái','牛肉河粉'], '닭고기쌀국수':['phở gà'],
  '후무스':['חומוס','حُمُّص','chickpea dip','鹰嘴豆蓉','鷹嘴豆泥'],
  '팔라펠':['פלאפל','فَلَافِل','chickpea fritters'],
  '샤와르마':['שווארמה','shawerma','شاورما','沙威瑪'],
  '타불레':['تبّولة','タブーリ'], '바바가누쉬':['بابا غنوج','eggplant dip','aubergine dip'],
  '샥슈카':['שקשוקה','شكشوكة','shakshuka eggs'],
  '코프타':['كفتة','کوفته','kofte'], '캅사':['كبسة'],
  '쿠나파':['كنافة','כנאפה','kunefe'], '바클라바':['بقلاوة','μπακλαβάς'],
  '케밥코비데':['کباب کوبیده'], '고르메사브지':['قورمه‌سبزی'],
  '버터치킨':['बटर चिकन','मुर्ग मखनी','murgh makhni'],
  '팔락파니르':['पालक पनीर','spinach paneer'], '차나마살라':['चना मसाला','छोले','chickpea curry'],
  '달타드카':['दाल तड़का','lentil dal'], '달마크니':['दाल मखनी'],
  '알루고비':['आलू गोभी'], '치킨비리야니':['चिकन बिरयानी','बिरयानी'],
  '마살라도사':['ಮಸಾಲೆ ದೋಸೆ','மசாலா தோசை'], '이들리':['இட்லி'],
  '굴랍자문':['गुलाब जामुन'], '라시':['लस्सी'], '마살라차이':['मसाला चाय'],
  '무사카':['μουσακάς'], '수블라키':['σουβλάκι'], '기로스피타':['γύρος','γυρόπιτα','gyro sandwich'],
  '짜지키':['τζατζίκι','cucumber yogurt dip'], '스파나코피타':['σπανακόπιτα','spinach pie'],
  '되네르케밥':['döner kebabı','ドネル・ケバブ'], '시시케밥':['şiş kebabı'],
  '비프스트로가노프':['бефстроганов'], '보르시치':['борщ','羅宋湯'],
  '우육면':['牛肉麵'], '완탕면':['餛飩麵','雲吞麵'], '북경오리':['北京烤鴨'],
  '동파육':['東坡肉'], '궁보계정':['宮保雞丁'], '어향가지':['魚香茄子'],
  '토마토계란볶음':['西紅柿炒雞蛋','番茄炒蛋'], '하가우':['蝦餃'], '슈마이':['燒賣','烧麦'],
  '차슈바오':['叉燒包'], '루러우판':['滷肉飯','魯肉飯'], '지파이':['雞排'],
  '파인애플케이크':['鳳梨酥'], '크렘브륄레':['크렘 브륄레','クレーム・ブリュレ'],
  '맥앤치즈':['mac & cheese','macaroni cheese','맥앤치즈'],
  '로티차나이':['roti prata','印度煎餅'], '포케볼':['poké bowl','ポケボウル'],
  '세비체':['ceviche peruano','ceviche de pescado'], '엠파나다':['empanadas de carne'],
  '팡지케이주':['パンデケージョ','チーズパン'], '과카몰레':['guac','guacamole dip']
};
for(const [name,aliases] of Object.entries(regionalNativeAliases))window.FreeUtilFoodAliases[name]=[...new Set([...(window.FreeUtilFoodAliases[name]||[]),...aliases])];
// These existing records have the same food AND the same reference portion.
// Preserve both names in search, but show only one calorie reference.
window.FreeUtilFoodCanonicalNames={'스크램블드에그':'스크램블에그','고구마말랭이':'말린고구마'};
for(const [alias,canonical] of Object.entries(window.FreeUtilFoodCanonicalNames)){
  window.FreeUtilFoodAliases[canonical]=[...new Set([...(window.FreeUtilFoodAliases[canonical]||[]),alias,...window.FreeUtilFoods[alias],...(window.FreeUtilFoodAliases[alias]||[])])];
  delete window.FreeUtilFoodAliases[alias];
}
