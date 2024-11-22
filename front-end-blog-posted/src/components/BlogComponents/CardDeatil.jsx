import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Nav from "../Nav";

export default function CardDeatil({ id }) {
	const [blogDeatil, setBlogDetail] = useState({});
	const [hasBlog, setHasBlog] = useState(false);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [aythId, setAuthid] = useState("");
	let loremText = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
									maiores iure tempore aliquid vitae perferendis molestias sint!
									Aut velit obcaecati nemo magnam harum, nostrum totam quibusdam
									provident architecto id aspernatur quasi consequatur voluptate,
									deserunt odit, dolor incidunt voluptatum officiis. Autem, maxime
									iure nostrum quasi dolore tempore! Perferendis amet quisquam eos
									alias dolor dignissimos nemo nulla adipisci. Tempore reiciendis
									hic quia ad dolor atque sed, modi quo excepturi est sequi,
									impedit, tenetur velit explicabo vero ratione inventore! Eum ea
									debitis eius! Sapiente qui ut repudiandae exercitationem eius
									aliquid, rem alias quibusdam magnam? Deleniti ea repellat
									dolorum tempore. Nemo aliquam iste distinctio dolorem, et error
									atque accusantium! Placeat cumque architecto itaque aliquid vero
									incidunt mollitia provident porro labore voluptate ratione sed
									pariatur sapiente maiores, saepe fugit, voluptatum aspernatur a
									et vel exercitationem minus! Ad placeat, velit repellendus
									veniam delectus laboriosam excepturi cum unde deserunt. Nostrum
									deleniti numquam ullam, facere corrupti enim accusantium,
									officia excepturi libero rerum odit qui molestiae temporibus
									natus id totam quia architecto obcaecati consequuntur,
									laudantium dolores. Ea officiis sed impedit fugiat corporis at
									exercitationem dolor optio, fuga veniam laudantium quia animi
									voluptate aspernatur voluptatibus? Facilis sed, dolor quisquam
									mollitia saepe sapiente unde expedita officia natus ducimus
									nulla fugit ratione? Architecto officiis, soluta ut ullam dolore
									dicta fugiat doloribus dolor ipsam consectetur explicabo cum,
									vel omnis sequi id adipisci optio? Qui dolorum nemo ab, voluptas
									eius fugiat est quisquam veniam laboriosam quos nam assumenda
									delectus suscipit officiis vel omnis. Exercitationem quos harum
									aliquid ducimus incidunt. Quo voluptatibus corporis eum
									asperiores repellat atque ratione, nobis, ipsam error beatae
									magnam culpa? Suscipit numquam atque, necessitatibus quidem
									animi recusandae? Odit, rerum! Placeat obcaecati ad illum
									voluptates nesciunt rem deserunt, laudantium doloremque veniam
									veritatis adipisci voluptatibus doloribus nemo aliquam
									consequatur nihil labore eaque? Quia ullam magnam et amet enim
									incidunt nisi dolorem atque omnis eum provident, ut, possimus
									molestiae dicta, necessitatibus sed nobis fugiat vel quaerat
									aperiam nemo aspernatur tenetur officia? Doloribus totam facere
									dignissimos praesentium harum, omnis blanditiis quibusdam at
									possimus ad ipsa voluptas exercitationem, natus sequi inventore
									modi atque non cum excepturi sunt? Suscipit debitis repellat
									dolor, officiis iusto velit quae impedit ad libero aperiam
									molestiae, cumque quisquam, alias sit asperiores incidunt magnam
									itaque totam. Iusto voluptate praesentium voluptatum? Sit quis
									dolor, ipsam facilis ut vel quia eum ex ad voluptate quibusdam
									eius eos iste laborum quaerat impedit mollitia labore a nulla in
									quo aperiam nesciunt. Perspiciatis impedit aspernatur hic
									veritatis quasi nihil ex cumque at! Porro, sint. Rem, iure
									veniam. Nihil deserunt neque laboriosam animi totam commodi quia
									minus quae excepturi vel nemo dolor architecto, atque natus
									facere obcaecati harum tenetur a nam! Blanditiis voluptatibus
									enim pariatur. Voluptas ipsum laborum placeat accusamus
									obcaecati suscipit, alias commodi! Dolore sapiente explicabo
									dignissimos numquam exercitationem saepe excepturi esse aliquam
									eligendi ab illum molestias, impedit accusantium beatae
									inventore repudiandae earum facilis perferendis nam perspiciatis
									blanditiis nostrum. Nulla laboriosam saepe voluptate voluptates?
									Necessitatibus sequi ea architecto modi impedit deserunt
									voluptatibus error delectus rem, similique vitae dolorem
									consequatur voluptate nesciunt corrupti veniam nisi praesentium
									ex eius fuga possimus nulla? Similique odit nemo molestiae!
									Distinctio cupiditate enim ea reiciendis pariatur voluptatum
									eveniet libero aut mollitia, unde corrupti. Error pariatur,
									dolorem corrupti, sunt voluptates asperiores accusantium sint
									totam quod commodi dolore similique quibusdam autem sed fugit
									aut animi rem sequi! Ex velit dicta iste doloribus cupiditate
									in, deserunt nihil nisi reiciendis laudantium ea quis neque quam
									atque laboriosam, libero ipsum repudiandae id iusto. At vitae
									eius neque perspiciatis sunt id, impedit asperiores commodi.
									Deleniti debitis reiciendis, iusto ratione molestias ducimus
									velit eum id? Illo, corrupti porro repellat architecto debitis
									excepturi eius sint dolorum obcaecati nesciunt, eligendi ipsum!
									Aspernatur cum, sunt voluptatum eligendi quod fugiat similique
									harum repellendus unde? Architecto quibusdam libero, iste natus,
									ut quae non fugiat quis ea repudiandae, nihil eum animi earum.
									Ducimus magnam aperiam commodi, totam, unde obcaecati, debitis
									aliquam architecto quibusdam veniam quae quaerat facere dolorem
									maxime laudantium sed accusantium? Maxime minus explicabo
									ducimus! Nulla eveniet obcaecati eius deserunt voluptas impedit
									est nam laborum assumenda consectetur? Maiores dolores similique
									porro optio doloribus earum eius! Sequi reiciendis alias aperiam
									totam a adipisci blanditiis, nemo maiores exercitationem aut
									deleniti quibusdam provident magni laudantium natus itaque,
									quasi commodi assumenda incidunt nihil tempore sapiente sint
									magnam dignissimos. Corporis quibusdam, laboriosam placeat rem
									neque iste ipsum atque tempore ut minima nihil amet, facilis
									nulla, similique mollitia sint dolorem! Vel excepturi eveniet
									fuga deleniti dicta ea dolorem, iure, quos eligendi quas sequi,
									nisi praesentium incidunt maiores obcaecati doloribus inventore!
									Optio eos rem quo aut itaque eius asperiores voluptatibus
									commodi facere sequi perferendis veniam quasi, fuga repellat
									minima sint quis repellendus corporis tempora alias dolore odit
									cum minus necessitatibus! Culpa dolores debitis eius incidunt
									provident et exercitationem ipsam possimus! Velit harum ab
									cumque saepe aliquid, illo adipisci architecto explicabo
									officiis perferendis omnis similique. Eos officia possimus, rem
									voluptatibus doloremque atque facere recusandae repellendus
									aspernatur neque vel culpa numquam eveniet cupiditate blanditiis
									sequi. Quibusdam, illum aliquid. At unde amet omnis obcaecati
									molestias exercitationem, corporis quia, sit totam velit nulla.
									Voluptate, quod dignissimos sit sapiente voluptatum minus.
									Excepturi tempora accusantium officia? Suscipit ipsam dolores
									fugit, minima, praesentium voluptate amet magnam tenetur dolorum
									expedita blanditiis inventore! Officiis, cupiditate impedit
									dolorem consequatur, facilis recusandae minima, ipsam culpa
									fugiat ut provident cumque doloribus vitae commodi voluptatem
									necessitatibus atque quis consequuntur deserunt dicta? Ipsa,
									sint. Praesentium, temporibus nulla excepturi officia inventore
									cumque perspiciatis veniam quos quas? Itaque blanditiis quam
									voluptatem unde debitis sequi accusantium eos, aspernatur
									distinctio amet expedita deleniti quis explicabo. Iste nulla
									officia veritatis eveniet? Vitae iste commodi velit odit ad
									ipsam unde tenetur aspernatur minima voluptates itaque
									necessitatibus fugiat omnis ducimus, quam fuga nostrum id
									accusamus ut, cum reprehenderit sapiente illum rerum placeat?
									Quasi eius repellendus ratione laboriosam eum accusantium
									voluptate animi laudantium natus dolor doloribus, consequatur
									cumque quaerat perspiciatis similique repellat sapiente, nihil
									odit nam assumenda, earum dignissimos ipsum. Nostrum eos,
									doloribus delectus molestiae quam maiores excepturi earum
									veniam, commodi aperiam reiciendis harum repellendus. Voluptas
									dolore eos incidunt? Placeat, cumque laborum? Distinctio
									dolorum, reiciendis ipsa quaerat, autem a dicta optio omnis et
									exercitationem magni ducimus deserunt consectetur delectus ipsam
									repellendus ut voluptates provident corporis nemo! Dolorum
									suscipit minus, ratione labore vero assumenda veritatis alias
									natus consequatur eum qui tenetur! Corporis beatae similique
									quod sequi et. Natus distinctio sunt eum at, praesentium
									obcaecati, labore, assumenda neque voluptates delectus error!
									Placeat, veniam. Incidunt, modi labore! Cupiditate explicabo
									harum accusantium dolores vero quidem iure repellat porro
									dolorum voluptatibus hic alias molestias aut architecto,
									tempore, ad adipisci soluta! Repellat ullam odit aliquid quia ut
									dolores sunt itaque dolorem architecto accusamus rem sint,
									accusantium ducimus, assumenda officia laudantium quae eum
									eveniet repudiandae natus voluptatibus? Quisquam fuga tempore
									magni amet at facere itaque exercitationem soluta quos hic.
									Doloribus consequatur optio quisquam, ex eaque cupiditate.
									Distinctio ipsum eum et libero delectus ab, atque commodi
									molestias aliquam officiis voluptatibus magnam tempore dolore
									fugiat ipsa suscipit reiciendis exercitationem, voluptas
									praesentium magni porro ipsam recusandae est dolores?
									Consectetur velit iure cupiditate repudiandae error? Fugit
									molestiae error facere est a provident enim corporis dolores
									cupiditate ipsa? Dolore, a. Laudantium eum pariatur modi
									reprehenderit accusamus maxime ex voluptatem, nulla cupiditate
									eos voluptatibus alias magnam amet porro. Omnis similique,
									veritatis ab magnam voluptate consectetur ipsa sit a pariatur
									quaerat error eos ipsum ipsam repellendus minus alias repellat
									officia sapiente excepturi maxime sint reprehenderit. Tempore,
									voluptate. In dignissimos aliquid et amet impedit laboriosam
									atque, praesentium, ipsum error excepturi temporibus, minima
									inventore distinctio laudantium nobis saepe reiciendis animi
									reprehenderit placeat ducimus doloremque ab quibusdam? Optio et
									esse eveniet, assumenda fuga suscipit ut. Voluptatem quas
									dolorum nemo? Numquam voluptatum assumenda, incidunt tenetur
									culpa amet nostrum animi tempora et sint illum ratione
									voluptatibus in non vel deserunt atque exercitationem
									reprehenderit perferendis unde molestiae nemo delectus.
									Dignissimos debitis est et architecto, harum voluptates, dolorem
									dolor iste voluptas voluptatibus adipisci! Deleniti distinctio,
									rem voluptatem dolorum ex, odit explicabo ullam error natus quae
									doloremque impedit eum odio in nulla nisi perferendis doloribus
									corrupti asperiores culpa debitis, est tempora! Error, inventore
									fuga, molestias corporis explicabo optio nulla animi ab sint
									ratione voluptatum blanditiis nobis quam et. Vero qui eveniet
									facilis, suscipit, dolorum explicabo voluptates minima ex dicta
									fugiat quis. Quaerat labore nobis repudiandae id voluptas amet,
									nisi, accusantium consequuntur at iusto provident consectetur
									aperiam aliquid. Eaque impedit dicta exercitationem, a quas
									quasi expedita eius aliquam quam. Numquam eveniet iste mollitia
									cum adipisci, illo consectetur asperiores! Ipsum cum,
									consequuntur quidem molestiae maxime molestias necessitatibus
									aut qui, totam aliquam illo hic dolor nam porro. Perferendis
									vitae animi et sit maxime? Nulla nobis, magni tenetur, quo saepe
									atque sed ex suscipit delectus laboriosam corporis mollitia
									optio! Minima totam esse consectetur ad dolore facere
									consequuntur a omnis praesentium earum. Possimus ad quaerat enim
									esse necessitatibus tempore nobis ipsam maxime alias incidunt
									delectus, nam omnis laudantium repellat, nulla quae qui
									repudiandae sit quasi itaque! Possimus quam ipsum in
									repellendus, error eaque assumenda atque tempora magni?
									Doloremque aspernatur, ipsa unde iste molestias, incidunt facere
									et saepe assumenda illo eos quasi quis culpa blanditiis minima
									nesciunt! Ipsam, voluptatum ullam! Accusamus velit nam amet
									excepturi impedit veniam eius, iste repellat placeat autem,
									libero expedita aliquam aspernatur quas distinctio at. Ea vero
									soluta aperiam aliquam, blanditiis, ipsam molestiae sapiente
									neque fuga debitis quam quia minus, saepe iure a nulla nihil
									nemo voluptates natus? Expedita, quis officiis ea harum incidunt
									sapiente. Cumque id, numquam quisquam in magni beatae laudantium
									ut necessitatibus, totam libero, adipisci neque provident
									excepturi nulla consequatur nisi dolorum facere mollitia
									aspernatur. Tenetur ad, vitae facere mollitia ipsam, ipsa at
									deleniti perferendis nihil ullam nemo unde repellendus in.
									Voluptatem explicabo sunt illo illum quis, repudiandae quod sit
									porro quibusdam ut veritatis aperiam eum neque delectus rem
									obcaecati libero ipsam dignissimos. Explicabo odio consectetur
									officia deleniti dolores quam iusto dolorem, nihil ratione modi
									exercitationem fugit repellat provident assumenda quae commodi
									voluptate labore omnis tempora nulla ducimus. Ullam qui ipsa
									eligendi cupiditate quaerat quibusdam quia consectetur voluptas
									natus laudantium. Modi voluptatem autem quam hic optio, eaque
									assumenda ut rem unde voluptatibus distinctio. Exercitationem
									sequi est rem delectus similique, sapiente, blanditiis
									repellendus praesentium maiores corrupti, a ullam voluptatibus
									laudantium. Rerum libero ipsam fuga neque ullam non dolore cum
									velit similique eligendi? Asperiores laborum quae rem? Eligendi
									reprehenderit voluptate autem ducimus consectetur eius,
									assumenda accusamus corporis unde, veniam, animi velit.
									Blanditiis impedit hic nemo! Corrupti placeat minus enim nihil
									consequuntur? Quod magni laboriosam cupiditate odit dolore eaque
									unde vero, eius, assumenda alias omnis expedita vel. Dicta,
									autem explicabo. Aut voluptas commodi quos quasi corporis id
									itaque aliquam quis quisquam ratione quibusdam tempore fugiat
									inventore provident sed incidunt blanditiis qui iusto doloribus,
									laborum consectetur consequatur minima. Tempora hic incidunt
									obcaecati ullam temporibus necessitatibus eum placeat. Dolorem
									est commodi vitae amet molestiae dignissimos reiciendis delectus
									doloremque, minus labore at quisquam voluptate aperiam itaque
									error vero, reprehenderit eligendi recusandae harum. Incidunt
									doloremque quos perferendis iste vero explicabo ut dolorum,
									cumque dicta deleniti fugiat provident velit. Tempora recusandae
									esse officia itaque sequi dolorem ducimus. Vel explicabo hic
									repudiandae repellendus possimus dicta vitae quia quas nesciunt
									iure quasi ab earum, veniam eveniet! Nemo rem repellat
									consequuntur. Illo velit perspiciatis reprehenderit aperiam esse
									omnis! Ducimus, expedita. Porro aspernatur molestiae numquam,
									iure laboriosam nostrum sequi iusto magnam nam! Recusandae,
									esse. Assumenda labore illum, doloremque dolorem maiores harum
									animi nobis repellat eos doloribus numquam perferendis delectus
									vitae enim illo aliquam libero et quaerat dicta architecto
									facere amet ut consectetur sed. Impedit, unde ea. Optio vitae
									voluptatum laboriosam eos minima, fuga velit totam id neque
									dolores quasi alias magnam, nam delectus quod ratione vel ex at
									excepturi illum debitis repudiandae. Maxime blanditiis, quod
									dolore commodi optio soluta cupiditate iure voluptates dolorem
									est assumenda error? Cumque debitis dolorem veniam, earum
									adipisci neque consequatur ipsa odit, non cum quam, tenetur
									laudantium sequi aut commodi recusandae quasi corporis laborum
									impedit ut nostrum? Mollitia sit odio voluptatum fuga dolore
									molestiae necessitatibus beatae aliquid cumque id maiores rerum
									accusamus veritatis illum nobis in quaerat iure pariatur,
									praesentium, libero quos aspernatur corporis expedita. Quae
									culpa aspernatur illum hic inventore repellendus recusandae
									voluptates, iste odit delectus saepe praesentium fuga expedita
									impedit doloremque labore nihil consequuntur fugit quia quo
									quisquam doloribus. Atque dignissimos quod rerum obcaecati
									consequatur. Quibusdam soluta nesciunt dolores nobis fuga ipsam
									voluptas ipsum, exercitationem eum a, ea sit rem corporis,
									obcaecati architecto vitae ipsa quasi amet repellat?
									Perspiciatis assumenda quisquam distinctio voluptate dignissimos
									repudiandae sunt at odio odit ab qui exercitationem provident
									eligendi ratione repellendus enim cupiditate tenetur, quod
									possimus id pariatur dolores alias. Voluptates ratione dolore
									quas aperiam culpa labore dolorem error veniam ducimus eos iste
									quod laborum saepe suscipit illo rem quos nulla, rerum sapiente
									pariatur eum eaque impedit debitis! Nam, eum excepturi, ipsa
									minima non repellat quasi harum placeat, reprehenderit natus
									dolore cumque a. Corporis quaerat sed, nisi vel impedit, labore,
									veritatis adipisci vitae possimus architecto laudantium
									dignissimos reprehenderit necessitatibus inventore voluptates
									quasi accusantium commodi quisquam! Sed obcaecati asperiores
									reprehenderit itaque veritatis odio suscipit eius. Voluptate
									autem quam provident at inventore similique sit incidunt
									mollitia! Vero, ad maxime! Facere facilis sunt amet hic
									voluptatibus placeat soluta, ratione, accusamus aliquam ducimus,
									odio doloribus odit provident minus magni molestias quidem animi
									harum enim quae recusandae vero! Eum repellendus quam
									exercitationem labore error! Nesciunt, officia eum quaerat
									maiores explicabo doloremque architecto ratione nulla aliquid
									mollitia totam veritatis consectetur ad ut nobis consequuntur
									iste hic cumque ullam asperiores sequi est numquam assumenda
									illo! Amet voluptatibus facere consectetur ducimus pariatur
									dolores, perferendis natus, error incidunt non, a laudantium
									iusto placeat obcaecati temporibus optio consequatur nisi
									voluptas. Unde soluta nesciunt ab fuga consequuntur praesentium
									veritatis maxime magni voluptate animi aliquid tempore sequi,
									dolor aperiam facilis aliquam porro dolores totam blanditiis.
									Error, sint repellendus excepturi vitae eius natus? Deleniti,
									ex! Quis minus incidunt obcaecati veritatis, dolorum dicta
									officiis quod dolor blanditiis corrupti accusamus ratione nobis
									repudiandae nemo repellat. Optio, inventore omnis facere hic
									doloribus earum dolor placeat enim magni laborum non fugiat,
									nesciunt quidem necessitatibus. Quaerat et impedit praesentium
									sit, totam beatae dolore tenetur mollitia accusantium amet ipsa
									quam nemo! Illum amet ex, doloribus commodi iste iure deserunt
									itaque placeat rem? Dolorum fuga aliquam, nisi, quo consequuntur
									facilis neque blanditiis sint ducimus earum delectus provident
									sit praesentium doloremque quos nam. Aliquid delectus,
									voluptatum ipsam ex obcaecati perspiciatis odit harum enim,
									consectetur sapiente odio placeat, minima labore porro esse
									rerum veritatis sint molestiae iure laboriosam! Atque fuga sint
									repellendus quam necessitatibus modi distinctio perferendis,
									amet dolor in eum exercitationem voluptates quod adipisci
									aliquam nihil dicta fugit explicabo tempore unde aut enim ea
									facilis alias? Esse odio voluptatum in iste illum hic,
									asperiores, quasi facilis ipsam tenetur quis sapiente earum
									dolorem. Cum dignissimos dolores temporibus, illum tenetur
									incidunt soluta esse ea dolorum consequuntur harum itaque porro,
									ut doloremque aperiam odit id similique maxime veniam? Assumenda
									incidunt nisi, perspiciatis doloribus nihil corrupti itaque
									perferendis odio architecto sapiente quibusdam commodi repellat
									inventore asperiores praesentium laborum neque est. Error
									aliquam ducimus amet, pariatur laudantium mollitia reiciendis
									officia quis ut commodi quam sunt doloremque nobis tempora magni
									exercitationem cum beatae molestiae ad dignissimos vel quia
									eligendi. Accusamus nesciunt rerum minima iste iusto voluptatem?
									Ipsum eligendi autem quas, sunt tempore pariatur beatae quis
									fugit dolore, minus accusamus sequi! Ea, dolor quae tenetur sunt
									facere illo. Earum autem error odit nisi, magni voluptatibus,
									fuga officiis accusantium illo consectetur molestiae molestias.
									Dolorem deleniti atque ipsum eum quae aliquam, molestiae
									laudantium hic ex? Accusantium error nulla molestiae, veritatis,
									nam ducimus est ipsa nesciunt aut adipisci cumque eligendi
									pariatur alias! Sed reprehenderit itaque odit hic impedit fuga
									ea magnam aliquam accusantium, architecto atque natus
									doloremque, accusamus vel cupiditate vitae dicta laudantium
									corrupti sint nihil delectus harum aliquid repudiandae nisi.
									Suscipit laborum aspernatur eligendi facilis fugiat molestiae
									nisi dolor eveniet eum minus fugit ipsum sequi officiis ratione,
									tempora non a, architecto, facere rem pariatur? Suscipit dolores
									placeat, ullam natus voluptatibus blanditiis magni iste, maiores
									quam enim eveniet, ea possimus sapiente dolorem vel nostrum
									numquam harum neque. Et porro, ut rem laboriosam voluptatibus
									minus. Illum eveniet alias tenetur voluptatem ad fugit saepe
									assumenda veniam beatae ducimus est veritatis consequatur,
									doloribus enim mollitia nobis itaque animi accusantium rerum sed
									molestiae dolorem eum quasi. Fugit minima, repellendus beatae
									facere repudiandae dolorem qui nobis perferendis, expedita hic
									accusantium quas? Reprehenderit sit culpa amet delectus qui
									doloribus eum accusamus! Molestias assumenda distinctio
									accusamus placeat temporibus vero exercitationem minima illum.
									Nemo sint iusto doloribus enim, nulla officiis rem voluptas, in
									totam commodi eos. Suscipit rerum voluptatem dignissimos
									adipisci cumque sit iusto tempora qui obcaecati veritatis porro
									blanditiis eius consequatur quis quibusdam deleniti in numquam
									non quaerat corporis, accusantium doloribus natus perferendis?
									Atque consequuntur molestiae fugit rerum non aut, dignissimos
									quas at dolorem autem quibusdam quod blanditiis magnam
									repellendus similique obcaecati doloremque sit culpa architecto
									vitae ipsam, facilis quisquam voluptate pariatur! Mollitia cum
									laboriosam autem? Dignissimos accusantium excepturi, autem
									provident neque numquam ipsam impedit maiores doloremque commodi
									voluptas natus ut, nulla amet possimus, deserunt ad quos? Sit,
									soluta quisquam officiis rem, distinctio nisi eveniet vel id
									dolore itaque assumenda expedita totam nesciunt, nihil odio?
									Provident, iure! Eaque ex illum, quibusdam harum eum commodi
									obcaecati voluptates tenetur sed beatae eligendi natus dolorem
									officia tempore molestiae ipsa non mollitia nam fugit
									exercitationem. Adipisci, eos! Possimus saepe neque aut et
									sapiente minima. Repellat fugiat nobis suscipit repellendus,
									perferendis, veniam in voluptatum eum optio est quas similique
									illo rem. Beatae provident, dolore accusamus cumque atque, sint
									cum voluptatem sunt neque tempora sed nam consectetur
									blanditiis? Enim dolore quia aliquid debitis tempore voluptates
									perferendis fugit distinctio eum odio, neque ut, perspiciatis
									soluta, corrupti dolorem numquam quam cumque! Necessitatibus,
									dolore? Laboriosam temporibus excepturi doloribus esse corporis
									nemo illo est alias non minima accusamus, iure cum vitae amet
									earum, porro eum voluptatibus sunt veritatis quisquam officia
									facilis repellat voluptatem! Non a ex excepturi fugiat error
									labore pariatur cupiditate magni temporibus, rerum neque
									reiciendis unde vitae hic, tempora deserunt! A debitis adipisci
									dignissimos doloribus iure cumque explicabo voluptates, officia
									obcaecati in quam sit praesentium? Unde consequatur voluptatibus
									maxime provident dignissimos voluptatem, neque dolorum inventore
									ipsam iste laboriosam. Dolor, ullam ducimus, voluptates quia
									voluptate voluptatum error esse nihil laborum, excepturi iure
									nobis quo est consequuntur consectetur doloribus modi sapiente
									labore eos id non illo. Vero dolores temporibus iusto
									exercitationem. Sit accusantium magni atque vitae maiores
									nostrum fugit facere voluptate, quibusdam esse et omnis nulla
									nam minus, rerum reprehenderit itaque dolorem explicabo.
									Molestiae magni in harum perspiciatis mollitia, sunt a pariatur
									nisi! Expedita, quod soluta animi at error rerum neque excepturi
									in assumenda velit cumque sed debitis asperiores sunt esse
									consectetur, ex numquam architecto? Esse, ea molestias quaerat
									mollitia eaque tenetur et sint nulla est, excepturi illum
									accusantium recusandae perferendis veniam? Necessitatibus ut,
									architecto nihil ratione ex qui illo totam a incidunt! Culpa id
									excepturi ipsam ducimus sequi facilis! Ipsa, tenetur blanditiis
									distinctio mollitia doloremque dolorum. Repellat eligendi, ut
									cupiditate quae fugit et minima corrupti explicabo fuga,
									assumenda obcaecati ab similique dolores! Enim cupiditate cumque
									asperiores praesentium at magni illo tempora incidunt repellat
									molestiae iusto, quas veritatis impedit consequatur, illum autem
									corporis voluptates, nihil vero ipsam aliquam repudiandae quia.
									Repellendus sint quis eveniet consequatur quos sit quia
									consectetur commodi obcaecati aliquam dolorum dolorem amet sequi
									saepe ex assumenda cum a optio natus doloribus, et nihil iste.
									Corporis soluta omnis delectus ipsam libero, aliquam deleniti
									accusantium saepe quia ipsa quam quasi, corrupti quo qui maxime
									placeat consequuntur repudiandae tenetur rerum ad veniam magni
									eius inventore. A tempora provident velit at possimus
									voluptatibus rem fuga error? Aliquam quas deleniti dolore non
									nam consequatur nihil placeat distinctio! Praesentium cupiditate
									sequi aut quia quas nihil animi unde natus rem, voluptas ea
									adipisci ducimus debitis harum. Dolores fuga repellendus
									temporibus necessitatibus laboriosam facilis quos tenetur ullam
									vel distinctio. Fugit eum, ullam debitis quia delectus in quod
									libero velit, suscipit, accusantium possimus labore odio
									expedita! Autem, quo! Unde delectus id reprehenderit voluptatum
									assumenda quos, et expedita esse quibusdam perferendis? Hic,
									incidunt velit quia ipsa animi iste sint officia sed tenetur
									impedit ut quasi alias saepe numquam itaque eum quae a id
									asperiores, reiciendis vitae. Eaque blanditiis, veritatis minima
									ipsa facere rem! Blanditiis, commodi consequatur obcaecati
									voluptate quasi veritatis aspernatur in magni! Hic eius cumque
									repellat. A autem accusamus rerum, placeat ea eos voluptatem
									porro sapiente praesentium temporibus est, laudantium quas odio
									quae ex in, iusto quasi vero quisquam sint perspiciatis
									explicabo quibusdam officiis? Magni sequi soluta qui sunt sint
									rem voluptas, vero molestiae a tempora non reiciendis saepe ea.
									Magni tempore iusto, odio corrupti consequuntur ex! Aliquam ut
									dolorem laborum mollitia asperiores quis, rem, recusandae
									deleniti dolorum, repellendus nihil illo quaerat voluptatibus
									repellat voluptate dignissimos! Beatae neque explicabo quasi
									cupiditate voluptate. Voluptas amet atque ratione possimus
									magnam quasi, incidunt quia aspernatur maiores repellat veniam
									nesciunt iste velit eum fuga culpa. Tempora alias odio id eos?
									Eaque, veniam sequi rerum esse ab obcaecati dolore quo sapiente
									architecto minima vitae eius quaerat reprehenderit ex? Corrupti
									officiis aliquid soluta sed culpa rerum animi pariatur expedita
									facere? Deserunt quod, eaque nesciunt voluptatibus at enim, modi
									incidunt repellat obcaecati quas, eum aspernatur soluta itaque
									consectetur. Saepe, cum? Ipsam commodi tenetur alias rem! Quis
									enim, impedit delectus cum temporibus dolore voluptas. Magni,
									ea! Consequatur obcaecati eius deserunt inventore distinctio,
									iure fugiat illum culpa eligendi fuga dolores incidunt eveniet
									vel, eos id ab nisi harum neque pariatur odio? Et a magnam
									autem, debitis veritatis suscipit ad iure nostrum amet, eligendi
									quia in exercitationem. Magnam ex, harum reprehenderit rerum
									odio alias voluptas repellat deserunt voluptates deleniti
									distinctio perspiciatis repellendus magni illo quod sequi libero
									ducimus consequuntur repudiandae dolores itaque ratione hic
									officiis voluptatem! Dolorum vel, officia quis, vero cumque
									neque, voluptatem consequatur eligendi quae earum debitis
									numquam magnam accusantium! Necessitatibus repudiandae eaque
									sapiente, culpa eius consequatur corporis ullam commodi iusto
									velit quibusdam pariatur molestias laudantium nemo officiis
									nobis ipsa. Aliquid perferendis labore maxime cupiditate
									exercitationem quisquam ipsa quas, quam accusamus? Est eos sint
									deleniti commodi veniam fugit ab mollitia sed error ipsum dolor
									quisquam vitae quia nemo veritatis ipsa explicabo, nihil harum
									corporis cupiditate sapiente excepturi, tempora fugiat delectus.
									Expedita eveniet id perspiciatis dolor corporis, pariatur
									consectetur sit, nostrum reiciendis eaque corrupti perferendis
									repellendus, quia alias error distinctio ad! Suscipit,
									dignissimos. Aliquid deleniti facere voluptas blanditiis
									expedita, laborum maiores cupiditate porro sint esse iste.
									Mollitia, est quae voluptatum nobis, quisquam, facere culpa
									dolor expedita aspernatur facilis nam. Minus exercitationem
									itaque, voluptas nesciunt est officiis quos nobis earum beatae
									ut. Iste ipsa dolorum voluptates perferendis id esse et
									quibusdam maxime quam soluta! Eveniet numquam, ullam rem
									laudantium non a cumque necessitatibus similique suscipit?
									Voluptatem, numquam. Expedita aliquid tempora doloremque
									aliquam, odit pariatur, officia sequi eveniet, quos unde quae
									similique nobis molestias blanditiis illum vero? Architecto
									ratione quasi deleniti quo illum quisquam maiores dolorum ad
									voluptas repudiandae, odit quis fuga libero minima? Omnis
									voluptatem ipsam provident aliquam dolores? Illo odit dolore
									tenetur ipsa, hic pariatur natus. Harum adipisci, tempora porro
									corrupti, temporibus nesciunt sequi est nulla dolores deserunt
									error ullam saepe molestiae totam voluptatibus earum cumque rem
									facilis deleniti vel odit corporis vitae! Mollitia quas
									molestiae sit hic nam delectus cupiditate corrupti quam sint
									adipisci excepturi facilis odio cumque, impedit eius, maxime
									perferendis illum ut voluptatem beatae magnam laboriosam
									aspernatur. Non architecto facere necessitatibus repellendus ad
									atque delectus cupiditate autem quas harum corporis cum
									laudantium sed quibusdam, iure nostrum. Impedit veritatis,
									numquam eos molestiae asperiores ratione quidem labore iure
									beatae ullam officia? Dicta dignissimos quod amet delectus ullam
									et cumque reprehenderit dolores! Provident recusandae
									accusantium fuga quas culpa autem iure, nostrum nam molestias
									explicabo. Voluptatibus natus, quam ratione laudantium
									praesentium facilis tenetur. Illo, quod voluptatibus qui
									provident accusantium ipsam, suscipit cum harum aut voluptate
									aliquam expedita sit dolorem dolore dolor hic possimus sunt
									odio? Sequi consequatur reiciendis temporibus sapiente vero
									ducimus minus veritatis quis, labore odit aspernatur qui
									blanditiis, nesciunt nostrum. Expedita dolore reprehenderit
									saepe atque, commodi cumque, quisquam aliquid nobis odio labore
									culpa impedit. Unde sequi est eum, quis odio temporibus, esse
									veniam dolorum voluptas ducimus voluptatem! Nesciunt ad
									molestias voluptates nihil tenetur voluptatum cumque praesentium
									voluptas doloremque porro nostrum quia dicta dolorem, illo
									officiis mollitia minima optio deleniti ratione debitis
									voluptate! Dignissimos eaque, molestiae accusantium minus labore
									consequuntur saepe, deserunt autem perferendis perspiciatis at
									natus quidem eum? Rerum voluptatem quos eveniet nemo optio
									soluta veritatis ullam molestiae rem perspiciatis. Quasi quo
									illo perspiciatis voluptate, earum harum perferendis ex in.
									Optio minima doloribus quibusdam fugiat magni sit incidunt
									repellendus officia, eum suscipit architecto vel assumenda quae
									a ex, natus eligendi, minus soluta! Quia veniam voluptas nihil
									rerum, totam mollitia perferendis quo fugit animi obcaecati sunt
									vero eum consequatur quidem earum delectus expedita commodi
									repellendus aut quod asperiores ad saepe ducimus illum! Modi
									adipisci cumque neque maxime commodi quidem perspiciatis saepe
									asperiores voluptas illum, facilis voluptate officiis hic a
									facere fugit. Est explicabo magnam sed, praesentium quidem
									laudantium amet qui ab non reiciendis nostrum impedit deleniti
									hic commodi, ducimus modi voluptatibus ullam maiores, earum
									error. Voluptatum pariatur fuga enim quod nesciunt dolore hic.
									Architecto at a alias corrupti dolores maxime aperiam blanditiis
									vero repellendus odio accusamus sapiente deserunt tenetur facere
									eius quae eos nisi, excepturi quis. Sit dicta harum minima
									exercitationem, voluptatibus provident et cumque velit quibusdam
									dolor magnam error consequuntur voluptate, sapiente quod dolore
									repellendus fugiat veritatis impedit id inventore ullam debitis
									eos. Illo qui enim possimus, harum blanditiis eos neque et ex
									ipsa. Laborum quibusdam dignissimos inventore assumenda
									corporis, itaque similique corrupti dolorem commodi consequatur
									ipsa a quaerat at in deserunt dicta, esse enim consequuntur
									laudantium? Provident et culpa totam. Sapiente labore omnis
									deleniti, error nostrum quis odio ducimus. Asperiores quidem eum
									quasi eaque pariatur inventore adipisci iste esse sunt. Labore
									rem, molestiae sunt est ipsam ea libero doloremque culpa?
									Eveniet magnam exercitationem nihil facere neque veritatis,
									quam, laborum dolorem enim repudiandae illo ipsa soluta! Ullam
									eos nobis commodi architecto harum illum repellendus iure
									voluptatibus blanditiis. Quidem voluptate qui, eligendi quisquam
									odit ipsam ut quaerat consequatur saepe ipsum sapiente ducimus
									mollitia non ratione alias! Illum, expedita ad! Eius labore
									ducimus molestiae similique. Quia asperiores cupiditate pariatur
									itaque non accusamus quod hic aliquam, voluptas, nulla possimus
									inventore. Non, ad. Magnam quas quisquam perspiciatis hic
									sapiente mollitia, soluta tenetur pariatur modi! Esse quidem id
									non natus suscipit maxime facilis laudantium! A, commodi nihil.
									Aut numquam, quos fugiat cupiditate doloribus odit suscipit
									ullam eligendi earum rem expedita laboriosam aspernatur
									architecto dolor, ratione in! Sit molestiae minima temporibus,
									est ab impedit officia assumenda dolorum magnam repudiandae
									mollitia debitis esse perspiciatis perferendis? Nostrum
									explicabo veritatis voluptatum facilis omnis quisquam libero
									minima, animi possimus ducimus dolore commodi laborum quam! Enim
									nostrum quaerat, architecto blanditiis sequi ducimus
									necessitatibus quam ipsam, qui at repellat nam amet? Ex
									veritatis nobis quasi, magni, architecto quod corrupti
									repellendus velit maxime debitis hic aspernatur doloribus fuga
									quae corporis eos, eum pariatur a! Porro necessitatibus tempora
									ipsam modi quas quos reiciendis unde assumenda laborum ratione.
									Maiores ipsum provident totam tempora velit! Repellat nemo
									facilis blanditiis voluptatem labore facere soluta unde mollitia
									dicta fugit dolorum maxime cum sit repudiandae libero, quod ea,
									nostrum magni odit voluptates? Molestiae consequatur et numquam
									sed, eius harum veritatis minima voluptatibus, vero voluptas
									ullam tempore. Nostrum delectus amet animi iste repudiandae,
									magni exercitationem eveniet libero quia sed adipisci eligendi
									tempore quisquam, dolorem ab quae architecto eius, molestias
									soluta ut possimus odio omnis dolorum enim. Quos ipsa
									consectetur doloremque? Et hic eum libero, minus rem officiis
									unde? Id odio laboriosam cupiditate asperiores voluptatibus
									nulla tenetur ex minima recusandae architecto obcaecati vero
									repudiandae optio doloribus enim, dolorum similique voluptate.
									Ea facilis voluptates neque delectus magni, magnam ducimus,
									perferendis similique, aspernatur cum placeat ullam suscipit
									voluptate accusantium assumenda quae laudantium temporibus
									nesciunt laborum et enim vero. Debitis optio necessitatibus
									veniam sunt natus quasi fugit tempora ullam quas laborum sint
									ratione cumque animi eligendi eius, corporis eos, rem quod
									aliquid aspernatur laudantium numquam excepturi quam aut? Ut
									tempore, quaerat et aspernatur omnis officiis? Quam harum,
									facilis nulla vitae expedita hic earum ipsam architecto vel
									labore laboriosam. Quos nulla at quibusdam ab facere animi natus
									quidem eum magni ut? Fuga fugiat nihil voluptatibus quibusdam
									deserunt consequatur ducimus voluptas culpa quod officiis ad sed
									asperiores aut quaerat voluptates alias porro, incidunt nemo
									minima sapiente sint aliquam soluta corrupti commodi. Modi
									necessitatibus quod alias quibusdam sunt, nisi incidunt culpa,
									non provident dolor velit porro possimus minus voluptatem
									adipisci praesentium. Architecto explicabo nobis ullam excepturi
									commodi necessitatibus eum fugit soluta numquam odit pariatur
									iste eligendi magnam minus animi voluptas aperiam sapiente a
									illo dolores illum, impedit vero. Earum autem odio pariatur
									quisquam. Optio at quos vero expedita numquam consequuntur
									voluptatibus, autem, cumque eos delectus neque aliquid
									temporibus omnis quam iusto, aspernatur exercitationem.
									Voluptate omnis labore exercitationem? Dolores, laborum magni
									voluptas expedita cum quo! Fugit eius, nesciunt amet ea nihil
									hic ipsam expedita asperiores corrupti sed. Accusamus, expedita.
									Rem, mollitia harum doloremque voluptatem amet enim iusto
									obcaecati sunt est odio delectus reiciendis autem corrupti
									reprehenderit ipsum possimus aperiam iure, vel tempore.
									Obcaecati minima qui nulla voluptatem laudantium soluta deserunt
									corporis illum tempora molestiae officiis distinctio velit amet
									ipsam porro excepturi, beatae saepe ipsum sint incidunt dolorem.
									Dolore provident aperiam, soluta, dicta reprehenderit
									perferendis esse natus ipsam sed dolores voluptas asperiores,
									ducimus odio ex sapiente labore officia consequatur rem.
									Expedita maiores inventore nostrum hic culpa? Adipisci
									distinctio eius soluta obcaecati unde nihil odit, cupiditate eos
									corporis quidem, dignissimos nemo neque modi beatae rerum est
									dolorum perferendis nesciunt aut ex excepturi. Commodi nesciunt
									reiciendis omnis natus numquam enim voluptatem magnam illo
									aliquam, qui dignissimos error suscipit perferendis impedit
									quis? Enim similique adipisci blanditiis iusto ab sit in saepe
									doloribus ad iure optio debitis molestiae consectetur nulla,
									illum ullam molestias quam perferendis ipsa quidem deleniti
									natus consequatur beatae animi! Voluptates pariatur fuga, ea
									quas ipsum similique maiores voluptatibus numquam veniam quia!
									Sint ipsa inventore magni harum placeat aperiam provident sunt
									incidunt autem, rem cum explicabo eius unde, commodi
									reprehenderit corporis, debitis voluptatibus? Ducimus odit et
									maiores accusamus quo molestias minima, adipisci impedit animi
									dignissimos rerum voluptatibus expedita necessitatibus atque
									assumenda consequuntur? Necessitatibus dolorem minus deleniti ab
									maxime expedita pariatur non magnam impedit itaque debitis odio
									enim, perspiciatis ad ducimus nisi esse fugit suscipit excepturi
									modi mollitia illo facere amet sunt. Maxime sapiente obcaecati
									distinctio aut iusto in aperiam dicta, nulla autem illo
									perferendis consequuntur quis qui cum. Natus quod illo autem
									provident rerum cupiditate soluta temporibus obcaecati. Ratione
									mollitia minima cumque facilis nemo nihil nostrum quod tenetur
									eos laborum?`;

	const handleComments = (e) => {
		e.preventDefault();
		if (!comment.trim()) {
			alert("กรุณราใส่ข้อมในช่อง");
			return;
		}

		setComments((prevCommnet) => [...prevCommnet, comment]);
		setComment("");
	};

	const getProfileuser = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/profile`, {
				withCredentials: true
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const splitContent = (text, lisesplit) => {
		const lines = text.split("\n");
		const paragraphs = [];
		for (let i = 0; i < lines.length; i += lisesplit) {
			paragraphs.push(lines.slice(i, i + lisesplit).join("\n"));
		}
		return paragraphs;
	};

	const getBlogbyId = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_API_URI}/api/blog/${id}`,
				{
					withCredentials: true
				}
			);
			setBlogDetail(response.data.blog);
			setHasBlog(true);
		} catch (error) {
			setHasBlog(false);
			console.log(error);
		}
	};

	const invertTime2Datetime = (isotime) => {
		const date = new Date(isotime);
		let localDate = date.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
		return localDate;
	};

	const paragraphs = splitContent(loremText, 15);

	useEffect(() => {
		getBlogbyId();
		getProfileuser();
	}, []);

	//console.log(blogDeatil); //blogDeatil.author.name blogDeatil.title blogDeatil.description
	return (
		<>
			<Nav />
			{hasBlog ? (
				<>
					<div className="relative flex flex-col justify-center items-center w-full h-full border border-1 border-red-500 p-4">
						<div className="flex justify-evenly items-stretch gap-4 w-[75%] h-full mb-2 px-4 border border-1 border-red-500">
							<div className="flex ">
								<img
									src={`${import.meta.env.VITE_BASE_API_URI}/${
										blogDeatil.author.image
									}`}
									width="100"
								/>
								<div className="py-[20px]">
									<p className="text-lg text-bold">{blogDeatil.author.name}</p>
									<p className="text-lg text-bold">{blogDeatil.author.email}</p>
								</div>
							</div>

							<p className="self-end opacity-25">
								created at: {invertTime2Datetime(blogDeatil.createdAt)}
							</p>
						</div>
						<div className="w-[75%] min-h-[200px] mb-2 border border-1 border-red-500">
							<section>
								<p className="text-xl">{blogDeatil.title}</p>
								{paragraphs.map((para, index) => (
									<p key={index} className="px-[2rem]">
										{para}
									</p>
								))}
							</section>
						</div>
						<div className="w-[75%] min-h-[200px] mb-2 border border-1 border-red-500">
							<p className="px-[0.5rem] text-xl mb-[1rem]">Comments</p>
							<form
								onSubmit={handleComments}
								className="px-[2rem] flex gap-[16px] items-center"
							>
								<textarea
									name="text"
									id=""
									placeholder="Please enter message..."
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className="px-[1.2rem] py-[0.7rem] outline-none resize-none overflow-hidden w-[50%] h-[50px] rounded-full border border-1 border-gray-200 shadow-md shadow-gray-200 focus:border focus:borser2 focus:border-gray-500"
								/>
								<button
									type="submit"
									className="p-[1rem] min-w-[150px] rounded-full bg-red-500 text-white opacity-50  hover:opacity-100 hover:transition-all hover:duration-500"
								>
									Comment
								</button>
							</form>
							<div>
								รายการ comments
								{comments.map((com, index) => (
									<div key={index}>{com}</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center items-center w-full">
					<h1 className="text-3xl text-bold w-1/2"></h1>
				</div>
			)}
		</>
	);
}
