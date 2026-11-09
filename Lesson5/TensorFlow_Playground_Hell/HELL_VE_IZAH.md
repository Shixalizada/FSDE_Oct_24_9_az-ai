# TensorFlow Playground — Müstəqil işin həll bələdçisi

**Mənbə:** Müəllimin 7 səhifəlik “Müstəqil İş: TensorFlow Playground” sənədi. **Vacib:** Bu faylda nəzəri izahlar həll edilib; Playground-da faktiki icra edilməyən təcrübələrin loss və epoch nəticələri qəsdən boş saxlanıb. Ölçmələri `neticeler.csv` və ya `tecrube_paneli.html` faylına yazın. Çəkilər təsadüfi olduğuna görə nəticələr dəyişə bilər. Hər təcrübədən qabaq Reset edin.

## Tapşırıq 1 — Tək neyron

**1.1:** Gaussian sinifləri təxminən xətti ayrılırsa, qərar sərhədi düz xətdir. Gizli qatsız model xətti klassifikatora / perseptrona bənzəyir.

**1.2:** Circle sinifləri bir-birini dairəvi əhatə edir. X1 və X2 girişləri ilə gizli qatsız model yalnız xətti sərhəd qura bildiyindən düzgün ayıra bilmir.

**1.3:** X1² və X2² əlavə ediləndə xətti çıxış neyronu yeni feature fəzasında `w1*x1 + w2*x2 + w3*x1² + w4*x2² + b = 0` tipli kvadratik sərhəd yarada bilir. Uyğun çəkilərlə bu, dairəyə bənzər olur. Çatışmazlıq: real şəkillərdə faydalı feature-ları əl ilə seçmək çətindir və miqyaslanmır.

## Tapşırıq 2 — XOR və gizli qat

**2.1–2.2:** XOR bir düz xəttlə ayrılmır. Bir gizli neyronun Tanh çevirməsi və son xətti çıxış, ümumiyyətlə, XOR-un tələb etdiyi iki ayrı regionu etibarlı qura bilmir. Minsky və Papert-in 1969-cu ildə vurğuladığı məhdudiyyət sadə perseptronun xətti ayrılmayan nümunələri öyrənə bilməməsidir; çoxneyronlu gizli qat bu məhdudiyyəti aşa bilir.

**2.3–2.4:** İki və daha çox gizli neyron fərqli xətti keçidləri öyrənir. Çıxış onların aktivliklərini birləşdirərək mürəkkəb, qeyri-xətti sərhəd yaradır. 2 və 4 neyronun faktiki nəticəsini 500 epoch-da yoxlayın; optimallaşdırma təsadüfi başlanğıcdan asılıdır.

**OR və NAND:** Bəzi gizli neyronların aktivlik xəritələri məntiqi qapılara oxşaya bilər, amma onların çəkiləri əvvəlcədən OR/NAND kimi kodlanmayıb. Ekvivalent həll müxtəlif çəkilərlə tapıla bilər; screenshot olmadan konkret neyronu OR və ya NAND adlandırmaq olmaz.

**Mini-tapşırıq:** Gizli qat 0, yeganə feature X1*X2 olarsa, ideal XOR sinifləri əsasən hasilin işarəsi ilə ayrılır. Bu feature məsələni yeni giriş fəzasında xətti ayrılan hala gətirə bilər; səs-küy və öyrənmə nəticəsinə görə yoxlayın.

## Tapşırıq 3 — Activation müqayisəsi

**Linear:** Bütün qatlar xətti olarsa, ardıcıl çevirmələr yenə bir xətti çevirməyə yığılır: `W2(W1x) = (W2W1)x` (bias olsa da affine çevirmədir). Buna görə Circle ayrılmır.

**ReLU və Tanh:** ReLU hissə-hissə xəttidir, buna görə sərhəddə künclü keçidlər görünə bilər. Tanh hamar funksiyadır və adətən daha hamar sərhəd verir.

**Sigmoid:** Törəmə `σ(x)(1−σ(x)) ≤ 0.25` olduğundan doyma zonalarında gradient kiçilir, öyrənmə yavaşıya bilər. Lakin **bu konkret sınaqda** ən yavaş olduğunu yalnız ölçmələrdən sonra demək olar. Hər activation üçün 500 epoch loss və ilk `loss < 0.05` epoch-u ayrıca yazın; heç düşməsə `—`.

## Tapşırıq 4 — Spiral və parametr sayı

Spiral mürəkkəb sərhəd tələb edir. Başlanğıc cəhdlər üçün `2→8→8→1`, `2→6→6→6→1`, `2→6→6→1` seçilib; bunlar **təsdiqlənmiş uğurlu həll deyil**. Müvafiq parametr sayları 105, 109 və 67-dir. Məqsəd `1000 epoch-dan əvvəl test loss < 0.1` şərtini təmin edən, sınaqdan keçirdiyiniz variantlar içində ən az parametrli şəbəkəni tapmaqdır. Daha kiçik modelin qlobal optimal olduğunu yalnız bu cəhdlərlə sübut etmək olmaz.

Qat artırmaq kompozisiyalı sərhədləri, neyron artırmaq isə bir qatdakı ifadə gücünü yüksəldə bilər; hansının daha çox kömək etdiyi ölçmədən asılıdır. `sin(X1)` və `sin(X2)` əlavə etməklə daha kiçik model işləsə, bu, uyğun feature engineering-in işi asanlaşdıra bildiyini göstərər. Qeyd: bu əlavələr giriş ölçüsünü 2-dən 4-ə çıxarır, parametr hesabını yeniləyin.

**Parametr düsturu:** Hər qat üçün `(giriş neyronu × çıxış neyronu) + çıxış neyronu (bias)`; bütün qatların cəmini alın.

## Tapşırıq 5 — Learning rate

`0.0001` çox kiçik addım olduğundan adətən ləng öyrənir; `0.003` və `0.03` daha sabit ola bilər; `0.3` və xüsusən `3` titrəmə və ya qeyri-sabitlik yarada bilər. **Bunlar gözləntilərdir, müşahidə kimi yazılmamalıdır.** 100 və 500 epoch-dakı real test loss-u yazıb ən yaxşı learning rate-i seçin.

Böyük addım dağın yamacında minimumun üstündən o tərəf-bu tərəfə sıçramağa bənzəyir. Real layihədə logaritmik şkala üzrə bir neçə learning rate sınayıb validation loss-a baxardım. Adam hər parametrin addımını gradientlərin hərəkətli orta qiymətlərinə uyğun adaptiv tənzimləyir, amma pis seçilmiş learning rate-i tam aradan qaldırmır.

## Tapşırıq 6 — Overfitting

**6.1:** 10% train data, noise=50 və 6×8-lik dərin şəbəkə ilə model təsadüfi nümunələri əzbərləyə bilər. Belə halda training loss test loss-dan xeyli aşağı olur və sərhəd nizamsız görünə bilər; bunu faktiki nəticə ilə təsdiqləyin.

**6.2 L2:** Böyük çəkiləri cərimələyərək həddən artıq mürəkkəb sərhədləri məhdudlaşdırır.

**6.3 Kiçik şəbəkə:** Modelin tutumunu azaldaraq əzbərləmə riskini aşağı salır, lakin underfitting yarada bilər.

**6.4 80% train:** Daha çox öyrənmə nümunəsi ümumiləşdirməni yaxşılaşdıra bilər, amma test dəstinin ölçüsü dəyişdiyindən nəticələrdə təsadüfi dəyişkənlik var.

**Hansı daha yaxşıdır?** `test loss − training loss` fərqini 6.1–6.4 üçün hesablayın və ən kiçik fərqi müqayisə edin. Təkcə fərqin kiçik olması yaxşı model demək deyil; test loss-un özünə də baxın.

**Early stopping:** Training loss azalmağa davam edərkən test/validation loss artmağa başlayırsa overfitting işarəsidir. Təlimi validation loss yaxşılaşmağı dayandıranda dayandırmaq early stopping adlanır; yekun test dəstini model seçimi üçün istifadə etməmək daha düzgündür.

## Yekun suallar

**1.** Gizli qatsız və yalnız X1, X2 girişli şəbəkə xətti ayrılmayan nümunələri öyrənə bilmir. Bunu ən aydın XOR (Tapşırıq 2) göstərir. Circle (Tapşırıq 1) də eyni məhdudiyyəti nümayiş etdirir. Yeni feature əlavə olunarsa məhdudiyyət qismən aradan qalxa bilər.

**2.** Activation-lar hamısı linear olarsa, çoxqatlı şəbəkə tək affine çevirməyə bərabərdir. Gizli qatlar təkbaşına qeyri-xətti sərhəd yaratmır. Tapşırıq 3-də Linear ilə Circle-ın ayrılmaması bunun nümunəsidir. Tanh/ReLU bu məhdudiyyəti aradan qaldırır.

**3.** Böyük şəbəkə daha mürəkkəb Spiral sərhədini modelləşdirməyə kömək edə bilər. Ancaq çox böyük şəbəkə az və səs-küylü məlumatda overfitting edə bilər. Tapşırıq 4-də uğurlu nəticə üçün kifayət qədər tutum, Tapşırıq 6-da isə ümumiləşdirmə əsasdır. Buna görə ölçü validation nəticəsinə görə seçilməlidir.

**4.** Əl ilə X1² və sin(X1) seçmək müəyyən sadə problemləri asanlaşdırır. Dərin şəbəkələr faydalı ara təsvirləri çox vaxt məlumatdan avtomatik öyrənir. Şəkil tanımada kənar, forma və daha mürəkkəb nümunələr ardıcıl qatlardan yarana bilər. Buna görə MNIST kimi tapşırıqlarda bütün feature-ları əl ilə yazmaq ehtiyacı azalır.

## Bonus — Regression / Multi gaussian

Problem type = Regression, dataset = Multi gaussian seçin. `test loss < 0.02` üçün kiçik şəbəkələrdən başlayıb arxitektura, parametr sayı və screenshot qeyd edin. **Real sınaq aparılmadığı üçün ən kiçik uğurlu model müəyyən edilməyib.** Classification sinif etiketini və qərar bölgələrini proqnozlaşdırır; regression isə davamlı ədədi qiymət proqnozlaşdırır. Playground-da loss və çıxış vizuallaşdırması problem tipinə görə dəyişir.

## Təqdimetmə yoxlama siyahısı

- Hər sınaqdan qabaq Reset, epoch sayına dəqiq riayət, loss-u 3 onluqla qeyd edin.
- Tapşırıq 1: 1.1 screenshot; Tapşırıq 2: 2.4-də iki neyron screenshot; Tapşırıq 4: ən yaxşı screenshot.
- Tapşırıq 5: learning rate 0.0001 və 3 loss qrafikləri; Tapşırıq 6: 6.1 və 6.2 qərar sərhədləri.
- Bonus: ən kiçik uğurlu regression şəbəkəsinin screenshot-u.
- Müəllimə təqdim üçün bütün cədvəllər, screenshot-lar və cavabları **bir PDF**-də birləşdirin.
