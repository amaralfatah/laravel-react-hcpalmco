 <table className="w-full text-[11px] border-collapse">
                                <tbody>
                                    {/* Row 1 */}
                                    <tr>
                                        <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top w-28">
                                            Inisiatif<br />Strategis
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top" colSpan={3}>
                                            {initiative.title}
                                        </td>
                                        <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top text-center w-16" rowSpan={4}>
                                            KPI's
                                        </td>
                                        <td className="bg-white px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top">
                                            Metric
                                        </td>
                                        <td className="bg-white px-3 py-2 border border-gray-800 font-bold text-gray-900 text-center align-top w-16">
                                            UOM
                                        </td>
                                        <td className="bg-white px-3 py-2 border border-gray-800 font-bold text-gray-900 text-center align-top w-32">
                                            Target
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr>
                                        <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top" rowSpan={3}>
                                            Deskripsi<br />Inisiatif &<br />Manfaat
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-gray-800 leading-relaxed text-justify align-top" rowSpan={3}>
                                            {initiative.description}
                                        </td>
                                        <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top w-24">
                                            Duration
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-gray-900 align-top italic w-48">
                                            {initiative.duration}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-gray-800 align-top">
                                            {initiative.kpis[0].metric}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-center text-gray-800 align-top">
                                            {initiative.kpis[0].uom}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-center font-bold text-gray-900 align-top">
                                            {initiative.kpis[0].target}
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr>
                                        <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top">
                                            Stream Lead
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top">
                                            {initiative.pic}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-gray-800 align-top">
                                            {initiative.kpis[1].metric}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-center text-gray-800 align-top">
                                            {initiative.kpis[1].uom}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-center font-bold text-gray-900 align-top">
                                            {initiative.kpis[1].target}
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr>
                                        <td className="bg-accent px-3 py-2 border border-gray-800 font-bold text-accent-foreground align-top">
                                            {initiative.budgetType}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 font-bold text-gray-900 align-top italic">
                                            {initiative.budgetAmount}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-gray-800 align-top">
                                            {initiative.kpis[2].metric}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-center text-gray-800 align-top">
                                            {initiative.kpis[2].uom}
                                        </td>
                                        <td className="px-3 py-2 border border-gray-800 text-center font-bold text-gray-900 align-top">
                                            {initiative.kpis[2].target}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
